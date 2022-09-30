import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotCard from "./BotCard";

function BotsPage() {
  //start here with your code for step one
  const [enlistedBots, setEnlistedBots] = useState([])
  const [allBots, setAllBots] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8002/bots")
    .then(result => result.json())
    .then(data => setAllBots(data))
  }, [])

  function botAlreadyEnlisted(bot){
    return Boolean(enlistedBots.find(enlistedBot => enlistedBot.id === bot.id))
  }

  function handleBotAction(bot, action){
    switch(action){
      case "toggle-listing":
        if(!botAlreadyEnlisted(bot)){
          setEnlistedBots([...enlistedBots, bot])
        }else {
          setEnlistedBots(enlistedBots.filter(enlistedBot => enlistedBot.id !== bot.id))
        }
        break;        
    }
  }

  function getBotList(botsArray){
    return botsArray.map(bot => <BotCard key={bot.id} bot={bot} handleBotAction={handleBotAction}/>)
  }

  return (
    <div>
      <YourBotArmy enlistedBots={getBotList(enlistedBots)}/>
      <BotCollection allBots={getBotList(allBots)}/>
    </div>
  )
}

export default BotsPage;
