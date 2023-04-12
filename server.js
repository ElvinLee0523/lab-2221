const express = require ('express');
const app = express ();
const port = 3000;
const bcrypt = require ('bcrypt');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send(req.body)
});

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`);
});

let dbUsers = [
    {
        /*username: "Soo",
        password: "password",
        name: "Soo Yew Guan",
        email: "soo@utem.edu.my"*/
    },

  ]
  
  async function login(username, password)
  {
    console.log("someone try to login with", username, password)
  
    let matched = dbUsers.find (element =>
        element.username == username
    )
    if (matched) 
    {
      // to match the actual password with the hash password
        const passmatch = await bcrypt.compare(password, matched.password)
        if (passmatch)
        {
            return matched
        }
  
        else
        {
            return "Password not matched"
  
        }
    }
    else 
    {
        return "Username not found"
  
    }
  }
  
  async function register(newusername,newpassword,newname,newemail)
  {
    // TODO: Check if username exist
    let matched = dbUsers.find (element =>
        element.username == newusername)
  
        if (matched)
        {
            return "Username has been used, cannot be register"
            
        }
        else
        {
          //encrypt password by using hash
            const hash = await bcrypt.hash(newpassword, 10);
            
            dbUsers.push(
                {
                    username : newusername,
                    password : hash,
                    name : newname,
                    email : newemail
                }
            )
            return "register successfully"
  
        }
  }

  app.post('/login', async (req,res) => {
    let data = req.body
    res.send(
      await login(
        data.username,
        data.password
      )
     );
  }); 
  
  app.post('/register', async (req,res) => {
    let data = req.body
    res.send(
      await register(
        data.newusername,
        data.newpassword,
        data.newname,
        data.newemail
      )
    );
  }); 