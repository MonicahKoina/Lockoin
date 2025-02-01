import { createContext } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const PocketBaseContext = createContext(pb); // Provide default value

export default PocketBaseContext;
