// Fetch and render public keys from map.yaml
document.addEventListener("DOMContentLoaded", () => {
    fetch('static/map.yaml')
        .then(response => response.text())
        .then(text => {
            const data = jsyaml.load(text);
            const keysContainer = document.getElementById("keys-container");

            data.public_keys.forEach(key => {
                const keyBox = document.createElement("div");
                keyBox.className = "key-box";

                const keyContent = document.createElement("pre");
                fetch(key.path)
                    .then(response => response.text())
                    .then(keyText => {
                        keyContent.textContent = keyText;
                    })
                    .catch(() => {
                        keyContent.textContent = "Error loading key.";
                    });

                const copyButton = document.createElement("button");
                copyButton.className = "copy-button";
                copyButton.textContent = "Copy";
                copyButton.addEventListener("click", () => {
                    navigator.clipboard.writeText(keyContent.textContent).then(() => {
                        alert("Key copied to clipboard!");
                    }).catch(() => {
                        alert("Failed to copy the key.");
                    });
                });

                keyBox.appendChild(keyContent);
                keyBox.appendChild(copyButton);
                keysContainer.appendChild(keyBox);
            });
        })
        .catch(error => {
            console.error("Error loading map.yaml:", error);
        });
});