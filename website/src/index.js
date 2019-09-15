import "./css/index.css";
import("../pkg")
    .then(wasm => wasm.run())
    .catch(console.error);
