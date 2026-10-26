import mysql from "mysql2/promise";
import { dbConfig } from "./config.js";

export const database = mysql.createPool(dbConfig);
