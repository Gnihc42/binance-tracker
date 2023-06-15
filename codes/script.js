var targetElement = document.getElementsByClassName("fixed-size-list")[0].firstChild.firstChild.firstChild.childNodes[1]

var queriedData = [];
const TOKEN = "Telegram_Bot_API_Key";


var minAmount = parseFloat("Minimum_BTC_Amount")

chatIds = {}
async function getUserIds() {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    const data = await response.json();
      console.log(data);
    const userIds = data.result.map((update) => update.message.chat.id);
      console.log(userIds);
  
      chatIds = userIds;
      
  }

const _ = await getUserIds();

async function sendWakeupMessage(userIds,message) {
    var sent = [];
  for (const userId of userIds) {
      console.log(userId);
      if (sent.includes(userId)){continue};
    sent.push(userId);
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: userId,
        text: message
      })
    });
    console.log(await response.json());
  }
}

function ReloadData(){

    for (Element of targetElement.parentNode.parentNode.parentNode.childNodes){

        var childs = Element.firstChild.childNodes;
      
        if  (queriedData.includes(childs[1].textContent) 
        || parseFloat(childs[1].textContent) < minAmount
        ){

            continue;
        }

        queriedData.push(childs[1].textContent);
        var sellbuy = Element.firstChild.className.includes("sell") ? "🟥 bán" : "🟩 mua";
        const message = `Shark đặt ${sellbuy} ${childs[1].textContent} BTC với giá ${childs[0].textContent} USDT`;

    
            sendWakeupMessage(chatIds,message);
        
    }
}
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    
    if (mutation.type === 'characterData' && mutation.target.parentNode.parentElement == targetElement.parentNode ) {
      // The innerHTML of the target element has been changed
      ReloadData();
      return;
    }
  });    
});

// Configure the observer to watch for changes to the target element's character data
const config = { characterData: true, subtree: true };

// Start observing the target element
observer.observe(targetElement, config);

