import { executeSchema } from "./migration/migration.js";
import { getRandomUsers } from "./service/userService.js";

executeSchema();
getRandomUsers();