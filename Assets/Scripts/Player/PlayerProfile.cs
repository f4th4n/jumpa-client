using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class PlayerProfile : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ChangeName(string name)
    {
        TextMeshProUGUI playerName = GameObject.Find("Player Name").GetComponent<TextMeshProUGUI>();
        playerName.SetText(name);
    }

    public void ChangePos(float x, float y)
    {
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        rb.MovePosition(new Vector2(x, y));
    }
}
