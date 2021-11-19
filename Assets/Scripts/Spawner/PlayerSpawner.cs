using UnityEngine;
using Jumpa.Player;
using System.Threading.Tasks;
using System;

namespace Jumpa {
    namespace Spawner {
        public class PlayerSpawner : MonoBehaviour {
            public async void Start() {
                /*
                BridgeSpawn("{\"id\":1,\"name\":\"test\",\"color\":[1,0,0],\"posX\":3.0,\"posY\":2.0}");

                await WaitOneSecondAsync();
                BridgeDestroy("1");
                */
            }

            private async Task WaitOneSecondAsync() {
                await Task.Delay(TimeSpan.FromSeconds(3));
                Debug.Log("Finished waiting.");
            }

            public GameObject PlayerPrefab;

            public void BridgeSpawn(string profileStr) {
                var profileObj = JsonUtility.FromJson<PlayerProfile>(profileStr);

                GameObject player = Instantiate(PlayerPrefab, new Vector3(profileObj.posX, profileObj.posY, 0), Quaternion.identity, transform);
                player.GetComponent<PlayerProfileHandler>().UpdateProfile(profileObj);
                player.name = profileObj.id.ToString();
            }

            public void BridgeDestroy(string playerId) {
                GameObject go = GameObject.Find("Spawner/PlayerSpawner/" + playerId);
                Destroy(go);
            }
        }

    }
}