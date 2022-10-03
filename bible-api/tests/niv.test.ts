import { getBibleText } from "../dist";
getBibleText("John 1:1-4", "NIV").then((doc) => console.log(doc));
