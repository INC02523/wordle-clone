import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formatted) => {
    if(currentGuess === solution) {
        setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = formatted
        return newGuesses; 
    })

    setHistory((prevHistory) => {
        return [...prevHistory, currentGuess];
    })

    setTurn((prevTurn) => {
        return prevTurn + 1;
    })
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formatted.forEach((l) => {
        const currentColor = newKeys[l.key]

        if(l.color === 'green') {
          newKeys[l.key] = 'green'
          return
        }

        if(l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow'
          return
        }

        if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[l.key] = 'grey'
          return
        }
      })

      return newKeys
    })

    setCurrentGuess('')
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You used all your guesses");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("Already exists");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("Must be 5 chars long");
        return;
      }

      const formatted = formatGuess();
      console.log(formatted);
      addNewGuess(formatted)
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return {
    turn,
    currentGuess,
    isCorrect,
    handleKeyup,
    guesses,
    usedKeys
  };
};

export default useWordle;
