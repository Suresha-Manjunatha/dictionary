import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [newWord, setNewWord] = useState("s");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState<any>("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord: any) => {
    setNewWord(enteredWord);
  };

  const getInfo = () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        var word = response[0].word;
        setCheckedWord(word);

        var def = response[0].meanings[0]?.definitions[0]?.definition;
        setDefinition(def);

        var eg = response[0].meanings[0].definitions[0].example;
        console.log(eg);
        setExample(eg);
      })
      .catch((err: any) => {
        alert("no results");
      });
  };

  function getRandom() {
    const randomNum = Math.floor(Math.random());
    setNewWord(randomNum.toString());
    getInfo();
  }

  useEffect(() => {
    getRandom();
  }, []);
  // const speak = () => {
  //   Speech.speak(checkedWord);
  // };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/dictionary.jpg")}
        resizeMode="stretch"
        style={{ flex: 1, width: "100%", height: "100vh" }}
      />

      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.inputBox}
            placeholder="search a word"
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            textAlign="center"
            clearButtonMode="always"
            onChangeText={searchWord}
            value={newWord}
          ></TextInput>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={styles.buttonDesign}
              onPress={() => {
                getInfo();
              }}
            >
              <Text style={styles.buttonText}>Go !</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDesign}
              onPress={() => {
                clear();
              }}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.textDesign}>Entered Word :{checkedWord} </Text>
            <Text style={styles.textDesign}>Definition : {definition} </Text>
            <Text style={styles.textDesign}>Example : {example} </Text>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  imageDesign: {
    width: "80%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 5,
    borderColor: "rgba(80, 235, 236 ,1)",
    marginTop: 100,
    fontSize: 25,
    backgroundColor: "white",
  },
  buttonDesign: {
    backgroundColor: "lightblue",
    width: 100,
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 8px #000000",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginTop: 5,
    textShadow: "2px 2px 8px #000000",
    fontWeight: "700",
  },
  speakerButton: {
    width: 50,
    height: 40,
  },
  textDesign: {
    fontSize: 25,
    backgroundColor: "transparent",
    marginTop: 10,
    alignSelf: "center",
    color: "white",
    textShadow: "2px 2px 8px #000000",
  },
});
