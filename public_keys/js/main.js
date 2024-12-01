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

                // Add a name tag
                const keyName = document.createElement("h3");
                keyName.textContent = key.name;
                keyName.className = "key-name";

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
                    }).catch(() => {
                        alert("Failed to copy the key.");
                    });
                });

                // Append elements to the box
                keyBox.appendChild(keyName);
                keyBox.appendChild(keyContent);
                keyBox.appendChild(copyButton);

                // Append the box to the container
                keysContainer.appendChild(keyBox);
            });
        })
        .catch(error => {
            console.error("Error loading map.yaml:", error);
        });
});