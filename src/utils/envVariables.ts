import dotenv from "dotenv";
dotenv.config();


if (!process.env["NODE_ENV"]) {
    throw new Error("No generator base URL. Set NODE_ENV environment variable.");
}
export const NODE_ENV = process.env["NODE_ENV"];

if (!process.env["REACT_APP_GENERATOR_URL_BASE"]) {
    throw new Error("No generator base URL. Set REACT_APP_GENERATOR_URL_BASE environment variable.");
}
export const GENERATOR_URL_BASE = process.env["REACT_APP_GENERATOR_URL_BASE"];
