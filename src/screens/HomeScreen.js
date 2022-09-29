import React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView  ,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import config from '../../config'
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
export default function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [action,setAction] = useState("create");
  const [updatingId,setUpdatingId] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: name, email: email});
    setEmail("");
    setName("");
    getUsers();
  };

  const updateUser = async () => {
    const userDoc = doc(db, "users", updatingId);
    const newFields = { email:email, name:name };
    await updateDoc(userDoc, newFields);
    setEmail("");
    setName("");
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log(config);
  useEffect(() => {

    getUsers();
  }, []);
  return (
    <SafeAreaView style={tw`bg-white flex-grow pt-5 px-5  `}>
      <ScrollView>
        <Text style={tw`text-gray-400 mt-5`}>Name</Text>
        <TextInput
          style={tw` w-full border-b-2 border-gray-200 h-12 p-1 mt-3 rounded-md `}
          value={name}
          onChangeText={(text)=>setName(text)}
        />

        <Text style={tw`text-gray-400 mt-5`}>Email</Text>
        <TextInput
          style={tw` w-full border-b-2 border-gray-200 h-12 p-1 mt-3 rounded-md `}
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        {/* <Icon style={{ paddingRight: 15, }} name={secure ? "eye" : 'eye-slash'}size={20} color='gray' onPress={() => setSecure(!secure)} /> */}
        {action==="create" &&
        <TouchableOpacity
          style={tw`mt-8 mb-4  rounded-lg text-center h-8 justify-center bg-green-500 `}
          onPress={() => createUser()}
        >
          <Text>Create User</Text>
        </TouchableOpacity>
        }
        {action==="update" &&(
          <View>

        <TouchableOpacity
          style={tw`mt-8  rounded-lg text-center h-8 justify-center bg-blue-500 `}
          onPress={() => updateUser()}
        >
          <Text>Update User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mt-2 mb-4  rounded-lg text-center h-8 justify-center bg-gray-500 `}
          onPress={() =>{ setAction("create")
                                setEmail("");
                                setName("")}}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
          </View>
        )}
        {users.map((user) => {
          return (
            <View style={tw`my-2`}>
              {" "}
              <Text>Name: {user.name}</Text>
              <Text>Email: {user.email}</Text>
              {action!=="update" &&
              <TouchableOpacity
                onPress={() =>{
                  setAction('update');
                  setEmail(user.email);
                  setUpdatingId(user.id)
                  setName(user.name);}}
              >
                <Text style={tw`text-blue-500 `}>Update User</Text>
              </TouchableOpacity>
              }
              <TouchableOpacity
                onPress={() => {
                  deleteUser(user.id);
                }}
              >
                <Text style={tw`text-red-500`}>Delete User</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
