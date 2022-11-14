// using : async and await :        // never do this***

function Header() {
    return (
         <header className="header">
             <img src="./images/troll-face.jpeg" className="header--image"/>
             <h2 className="header--title">Meme Generator</h2>
             <h4 className="header--project">React Project</h4>
         </header>
     )
 }
 
 function Meme() {

     const [memeData, setMemeData] = React.useState({
         topText : "",
         bottomText : "",
         randomImage : "http://i.imgflip.com/1bij.jpg"
        })
        
    const [allMemes, setAllMemes] = React.useState([])        
    

    React.useEffect(async () => {      // never do this***
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
    }, [])
                
    console.log(allMemes[Math.round(Math.random() * 99)])

     function getImage() {
        //  console.log(ob.data.memes[Math.round(Math.random() * 99)].url)
        //  const url =  ob.data.memes[Math.round(Math.random() * 99)].url
            

/**
 * Challenge: 
 * Try to figure out why our code is broken! 😞
 * 
 * Hint: it has to do with the difference between
 * what we were importing before from memesData.js
 * and what we're setting our state as with `allMemes`
 */
        setMemeData(prevMemeData => {             // same set-state is used for both the states. 
            return {
                ...prevMemeData,
                randomImage : allMemes[Math.round(Math.random() * 99)].url
            }
        })
     }

     function handleChange(event){
        const {name,value} = event.target   //destructure the object
        setMemeData(prevMemeData => ({             // same set-state is used for both the states.
            ...prevMemeData,
            [name] : value
        }))
     }

     return (
         <main>
            <div className="form">
                 <input 
                    type="text" 
                    className="form--input left" 
                    placeholder="Top text"
                    name="topText"
                    value={memeData.topText}
                    onChange={handleChange}
                    
                />
                 <input 
                    type="text" 
                    className="form--input right" 
                    placeholder="Bottom text"
                    name="bottomText"
                    value={memeData.bottomText}
                    onChange={handleChange}
                />
                 <button 
                    className="form--button" 
                    onClick = {getImage}> Get a new meme image 🖼 
                 </button>
            </div>   
            <div className="meme">
                <img src = {memeData.randomImage} className="meme--image"/>                  
                <h2 className="meme--text top">{memeData.topText}</h2>
                <h2 className="meme--text bottom">{memeData.bottomText}</h2>
            </div>
            
         </main>
     )
 }
 
 
function App() {
     return (
         <div className="container">
             <Header />
             <Meme />
         </div>
     )
 }
 
ReactDOM.render(<App />, document.getElementById("root"))
 
 