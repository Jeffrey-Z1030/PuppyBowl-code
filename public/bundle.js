/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2207-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


const fetchAllPlayers = async () => {
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

const fetchSinglePlayer = async (playerId) => {
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

const addNewPlayer = async (playerObj) => {
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

const removePlayer = async (playerId) => {
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


/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");




const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove" data-id=${pup.id}>Remove</button>
      </div>
      
    `;
    playerContainerHTML += pupHTML;

    
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      

     console.log((0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id));

   //   const player = await fetchSinglePlayer(button.dataset.id)
    renderSinglePlayer (await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id));
   
      /*
        YOUR CODE HERE
      */
    });
 
  }

  let removeButtons = [...document.getElementsByClassName('remove')];
  for (let i = 0; i < removeButtons.length; i++) {

    const button = removeButtons[i];
    button.addEventListener('click', async () => {
    await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(button.dataset.id)
    const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
    renderAllPlayers(players);
    });

 
  }
  
};

const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>

  `;
  
  
  playerContainer.innerHTML = pupHTML;
  let backButton = document.getElementById('see-all')
    backButton.addEventListener('click', async () => {
      renderAllPlayers(await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)())
    });

};

  
  

const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value

    }
   await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
   const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
   renderAllPlayers(players);
   form.element.name.value=''
   form.element.breed.value=''
   


    /*

      YOUR CODE HERE
    */
  });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L3JlbmRlckhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7OztBQUcvRDtBQUNQO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EscUNBQXFDLE9BQU8sV0FBVyxTQUFTO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0Esa0JBQWtCLG1DQUFtQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLFVBQVUsT0FBTyxVQUFVLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVFZ0Q7QUFDRTtBQUNMO0FBQ0E7QUFDN0M7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBLG9CQUFvQixhQUFhLGtCQUFrQixTQUFTO0FBQzVELGdEQUFnRCxPQUFPO0FBQ3ZELHlDQUF5QyxPQUFPO0FBQ2hEOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7OztBQUdBLGlCQUFpQiwrREFBaUI7O0FBRWxDO0FBQ0EsOEJBQThCLCtEQUFpQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLGlCQUFpQiwwQkFBMEI7O0FBRTNDO0FBQ0E7QUFDQSxVQUFVLDBEQUFZO0FBQ3RCLDBCQUEwQiw2REFBZTtBQUN6QztBQUNBLEtBQUs7OztBQUdMOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUMsaUNBQWlDLGFBQWE7QUFDOUM7QUFDQSxpQkFBaUIsb0RBQW9EO0FBQ3JFLGtCQUFrQixnQkFBZ0I7QUFDbEMsa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNkRBQWU7QUFDNUMsS0FBSzs7QUFFTDs7Ozs7QUFLTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsMERBQVk7QUFDckIseUJBQXlCLDZEQUFlO0FBQ3hDO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7VUM3SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ3dCOztBQUV2RTtBQUNBLHdCQUF3Qiw2REFBZTtBQUN2QyxFQUFFLGlFQUFnQjs7QUFFbEIsRUFBRSxvRUFBbUI7QUFDckI7O0FBRUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQWRkIHlvdXIgY29ob3J0IG5hbWUgdG8gdGhlIGNvaG9ydE5hbWUgdmFyaWFibGUgYmVsb3csIHJlcGxhY2luZyB0aGUgJ0NPSE9SVC1OQU1FJyBwbGFjZWhvbGRlclxyXG5jb25zdCBjb2hvcnROYW1lID0gJzIyMDctRlRCLUVULVdFQi1QVCc7XHJcbi8vIFVzZSB0aGUgQVBJVVJMIHZhcmlhYmxlIGZvciBmZXRjaCByZXF1ZXN0c1xyXG5jb25zdCBBUElVUkwgPSBgaHR0cHM6Ly9mc2EtcHVwcHktYm93bC5oZXJva3VhcHAuY29tL2FwaS8ke2NvaG9ydE5hbWV9L2A7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoQWxsUGxheWVycyA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElVUkx9cGxheWVyc2ApO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhLnBsYXllcnM7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignVWggb2gsIHRyb3VibGUgZmV0Y2hpbmcgcGxheWVycyEnLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgXHJcbiAgIFxyXG4gIC8vICAgY29uc3QgYWxsUGxheWVycyA9IGF3YWl0IGZldGNoKCdodHRwczovL2ZzYS1wdXBweS1ib3dsLmhlcm9rdWFwcC5jb20vYXBpLzIyMDctRlRCLUVULVdFQi1QVC9wbGF5ZXJzJykudGhlbihcclxuICAvLyAgICAgIChSZXNwb25zZSkgPT4gUmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpPT4gZGF0YSlcclxuIC8vKTtcclxuICAvLyAgcmV0dXJuIGFsbFBsYXllcnM7XHJcblxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaFNpbmdsZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xyXG4gICB0cnkge1xyXG4gICAgY29uc29sZS5sb2cocGxheWVySWQpXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKChgJHtBUElVUkx9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKSk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YS5wbGF5ZXIpO1xyXG4gICAgcmV0dXJuIGF3YWl0IHJlc3VsdC5kYXRhLnBsYXllcjtcclxuICAgfWNhdGNoKGVycil7XHJcbiAgICBjb25zb2xlLmVycnJvcihlcnIpO1xyXG4gICB9XHJcbiAgIFxyXG4gICB9XHJcbiAgICAgIFxyXG4vL307XHJcblxyXG5leHBvcnQgY29uc3QgYWRkTmV3UGxheWVyID0gYXN5bmMgKHBsYXllck9iaikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgJHtBUElVUkx9L3BsYXllcnMvJGAsXHJcbiAgICAgIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGxheWVyT2JqKVxyXG4gICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGFcclxuICB9Y2F0Y2ggKGVycil7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAoYCR7QVBJVVJMfXBsYXllcnMvJHtwbGF5ZXJJZH1gKSxcclxuICAgICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIH1cclxuXHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBmZXRjaEFsbFBsYXllcnMgfSBmcm9tICcuL2FqYXhIZWxwZXJzJztcclxuaW1wb3J0IHsgZmV0Y2hTaW5nbGVQbGF5ZXIgfSBmcm9tICcuL2FqYXhIZWxwZXJzJztcclxuaW1wb3J0IHsgYWRkTmV3UGxheWVyIH0gZnJvbSAnLi9hamF4SGVscGVycyc7XHJcbmltcG9ydCB7IHJlbW92ZVBsYXllciB9IGZyb20gJy4vYWpheEhlbHBlcnMnO1xyXG5jb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsLXBsYXllcnMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG5ld1BsYXllckZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXBsYXllci1mb3JtJyk7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyQWxsUGxheWVycyA9IChwbGF5ZXJMaXN0KSA9PiB7XHJcbiAgLy8gRmlyc3QgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgZGF0YSBiZWZvcmUgdHJ5aW5nIHRvIHJlbmRlciBpdCFcclxuICBpZiAoIXBsYXllckxpc3QgfHwgIXBsYXllckxpc3QubGVuZ3RoKSB7XHJcbiAgICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gJzxoMz5ObyBwbGF5ZXJzIHRvIGRpc3BsYXkhPC9oMz4nO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsYXllcnMsIGFuZCBjb25zdHJ1Y3Qgc29tZSBIVE1MIHRvIGRpc3BsYXkgZWFjaCBvbmVcclxuICBsZXQgcGxheWVyQ29udGFpbmVySFRNTCA9ICcnO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcHVwID0gcGxheWVyTGlzdFtpXTtcclxuICAgIGxldCBwdXBIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLXBsYXllci1jYXJkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1pbmZvXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cHVwLm5hbWV9PC9wPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJwdXAtbnVtYmVyXCI+IyR7cHVwLmlkfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aW1nIHNyYz1cIiR7cHVwLmltYWdlVXJsfVwiIGFsdD1cInBob3RvIG9mICR7cHVwLm5hbWV9IHRoZSBwdXBweVwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJkZXRhaWwtYnV0dG9uXCIgZGF0YS1pZD0ke3B1cC5pZH0+U2VlIGRldGFpbHM8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCIgZGF0YS1pZD0ke3B1cC5pZH0+UmVtb3ZlPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICAgIGA7XHJcbiAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XHJcblxyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvLyBBZnRlciBsb29waW5nLCBmaWxsIHRoZSBgcGxheWVyQ29udGFpbmVyYCBkaXYgd2l0aCB0aGUgSFRNTCB3ZSBjb25zdHJ1Y3RlZCBhYm92ZVxyXG4gIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwbGF5ZXJDb250YWluZXJIVE1MO1xyXG5cclxuICAvLyBOb3cgdGhhdCB0aGUgSFRNTCBmb3IgYWxsIHBsYXllcnMgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTSxcclxuICAvLyB3ZSB3YW50IHRvIGdyYWIgdGhvc2UgXCJTZWUgZGV0YWlsc1wiIGJ1dHRvbnMgb24gZWFjaCBwbGF5ZXJcclxuICAvLyBhbmQgYXR0YWNoIGEgY2xpY2sgaGFuZGxlciB0byBlYWNoIG9uZVxyXG4gIGxldCBkZXRhaWxCdXR0b25zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RldGFpbC1idXR0b24nKV07XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXRhaWxCdXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkZXRhaWxCdXR0b25zW2ldO1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBcclxuXHJcbiAgICAgY29uc29sZS5sb2coZmV0Y2hTaW5nbGVQbGF5ZXIoYnV0dG9uLmRhdGFzZXQuaWQpKTtcclxuXHJcbiAgIC8vICAgY29uc3QgcGxheWVyID0gYXdhaXQgZmV0Y2hTaW5nbGVQbGF5ZXIoYnV0dG9uLmRhdGFzZXQuaWQpXHJcbiAgICByZW5kZXJTaW5nbGVQbGF5ZXIgKGF3YWl0IGZldGNoU2luZ2xlUGxheWVyKGJ1dHRvbi5kYXRhc2V0LmlkKSk7XHJcbiAgIFxyXG4gICAgICAvKlxyXG4gICAgICAgIFlPVVIgQ09ERSBIRVJFXHJcbiAgICAgICovXHJcbiAgICB9KTtcclxuIFxyXG4gIH1cclxuXHJcbiAgbGV0IHJlbW92ZUJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlJyldO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlQnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IHJlbW92ZUJ1dHRvbnNbaV07XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCByZW1vdmVQbGF5ZXIoYnV0dG9uLmRhdGFzZXQuaWQpXHJcbiAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XHJcbiAgICByZW5kZXJBbGxQbGF5ZXJzKHBsYXllcnMpO1xyXG4gICAgfSk7XHJcblxyXG4gXHJcbiAgfVxyXG4gIFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclNpbmdsZVBsYXllciA9IChwbGF5ZXJPYmopID0+IHtcclxuICBpZiAoIXBsYXllck9iaiB8fCAhcGxheWVyT2JqLmlkKSB7XHJcbiAgICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gXCI8aDM+Q291bGRuJ3QgZmluZCBkYXRhIGZvciB0aGlzIHBsYXllciE8L2gzPlwiO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGV0IHB1cEhUTUwgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLXBsYXllci12aWV3XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItaW5mb1wiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwicHVwLXRpdGxlXCI+JHtwbGF5ZXJPYmoubmFtZX08L3A+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJwdXAtbnVtYmVyXCI+IyR7cGxheWVyT2JqLmlkfTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxwPlRlYW06ICR7cGxheWVyT2JqLnRlYW0gPyBwbGF5ZXJPYmoudGVhbS5uYW1lIDogJ1VuYXNzaWduZWQnfTwvcD5cclxuICAgICAgPHA+QnJlZWQ6ICR7cGxheWVyT2JqLmJyZWVkfTwvcD5cclxuICAgICAgPGltZyBzcmM9XCIke3BsYXllck9iai5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke1xyXG4gICAgcGxheWVyT2JqLm5hbWVcclxuICB9IHRoZSBwdXBweVwiPlxyXG4gICAgICA8YnV0dG9uIGlkPVwic2VlLWFsbFwiPkJhY2sgdG8gYWxsIHBsYXllcnM8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICBgO1xyXG4gIFxyXG4gIFxyXG4gIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwdXBIVE1MO1xyXG4gIGxldCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlZS1hbGwnKVxyXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgcmVuZGVyQWxsUGxheWVycyhhd2FpdCBmZXRjaEFsbFBsYXllcnMoKSlcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbiAgXHJcbiAgXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3UGxheWVyRm9ybSA9ICgpID0+IHtcclxuICBsZXQgZm9ybUhUTUwgPSBgXHJcbiAgICA8Zm9ybT5cclxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lOjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgLz5cclxuICAgICAgPGxhYmVsIGZvcj1cImJyZWVkXCI+QnJlZWQ6PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJyZWVkXCIgLz5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbiAgYDtcclxuICBuZXdQbGF5ZXJGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IGZvcm1IVE1MO1xyXG5cclxuICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcGxheWVyRGF0YSA9IHtcclxuICAgICAgbmFtZTogZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxyXG4gICAgICBicmVlZDogZm9ybS5lbGVtZW50cy5icmVlZC52YWx1ZVxyXG5cclxuICAgIH1cclxuICAgYXdhaXQgYWRkTmV3UGxheWVyKHBsYXllckRhdGEpO1xyXG4gICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XHJcbiAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XHJcbiAgIGZvcm0uZWxlbWVudC5uYW1lLnZhbHVlPScnXHJcbiAgIGZvcm0uZWxlbWVudC5icmVlZC52YWx1ZT0nJ1xyXG4gICBcclxuXHJcblxyXG4gICAgLypcclxuXHJcbiAgICAgIFlPVVIgQ09ERSBIRVJFXHJcbiAgICAqL1xyXG4gIH0pO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyB9IGZyb20gJy4vYWpheEhlbHBlcnMnXHJcbmltcG9ydCB7IHJlbmRlckFsbFBsYXllcnMsIHJlbmRlck5ld1BsYXllckZvcm0gfSBmcm9tICcuL3JlbmRlckhlbHBlcnMnXHJcblxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKVxyXG4gIHJlbmRlckFsbFBsYXllcnMocGxheWVycylcclxuXHJcbiAgcmVuZGVyTmV3UGxheWVyRm9ybSgpXHJcbn1cclxuXHJcbmluaXQoKVxyXG4iXSwic291cmNlUm9vdCI6IiJ9