using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class PlayerProfile : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        //TryTry("hoooh");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void TryTry(string name)
    {


        TextMeshProUGUI playerName = GameObject.Find("Player Name").GetComponent<TextMeshProUGUI>();
        playerName.SetText(name);
    }
}
