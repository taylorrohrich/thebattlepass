import { combineReducers } from "redux";
import season from "./season";
import map from "./map";
import general from "./general";
import moderator from "./moderator";
export default combineReducers({ season, map, general, moderator });
