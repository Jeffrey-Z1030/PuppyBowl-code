// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2207-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


export const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result.data.players;
      } catch (error) {
        console.error('Uh oh, trouble fetching players!', error);
      }
   
   
  //   const allPlayers = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2207-FTB-ET-WEB-PT/players').then(
  //      (Response) => Response.json().then((data)=> data)
 //);
  //  return allPlayers;


};

export const fetchSinglePlayer = async (playerId) => {
   try {
    console.log(playerId)
    const response = await fetch((`${APIURL}/players/${playerId}`));
    const result = await response.json();
    console.log(result.data.player);
    return await result.data.player;
   }catch(err){
    console.errror(err);
   }
   
   }
      
//};

export const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(
      `${APIURL}/players/$`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerObj)
      }
        );
        const result = await response.json();
        console.log(result);
        return result.data
  }catch (err){
    console.log(err)
  }
};

export const removePlayer = async (playerId) => {
  try {
    const response = await fetch(
      (`${APIURL}players/${playerId}`),
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
    return;
  } catch (err) {
    console.error(err);
  }


};
