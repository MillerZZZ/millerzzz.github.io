/**
 * @copyright 2025 Miller Zhang
 * @author Miller Zhang
 * @license Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Fetch and render public keys from map.yaml
document.addEventListener("DOMContentLoaded", () => {
    fetch('static/map.yaml')
        .then(response => response.text())
        .then(text => {
            const data = jsyaml.load(text);
            const keysContainer = document.getElementById("keys-container");

            data.public_keys.forEach(key => {
                // Add a name tag before the box
                const keyName = document.createElement("h3");
                keyName.textContent = key.name;
                keyName.className = "key-name";

                // Create the box for the key
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
                    }).catch(() => {
                        alert("Failed to copy the key.");
                    });
                });

                // Append content to the box
                keyBox.appendChild(keyContent);
                keyBox.appendChild(copyButton);

                // Append the name tag and the box to the container
                keysContainer.appendChild(keyName);
                keysContainer.appendChild(keyBox);
            });
        })
        .catch(error => {
            console.error("Error loading map.yaml:", error);
        });
});