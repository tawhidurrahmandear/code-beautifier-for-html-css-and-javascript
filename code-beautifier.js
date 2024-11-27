// Code Beautifier for HTML, CSS and JavaScript
// developed by Tawhidur Rahman Dear, https://www.tawhidurrahmandear.com
// Live Preview available at https://www.devilhunter.net/p/code-beautifier.html

        const getElement = (id) => document.getElementById(id);
        const notify = (message, duration = 2000) => {
            const notification = getElement('notification');
            notification.textContent = message;
            setTimeout(() => (notification.textContent = ''), duration);
        };

        const beautifyHTML = (html) => {
            let formatted = '';
            let indentLevel = 0;
            const indentSize = '  ';
            html.split(/>\s*</).forEach((element) => {
                if (element.match(/^\/\w/)) {
                    indentLevel--;
                    formatted += `${indentSize.repeat(indentLevel)}<${element}>\n`;
                } else if (element.match(/^<?\w[^>]*[^/]$/)) {
                    formatted += `${indentSize.repeat(indentLevel)}<${element}>\n`;
                    indentLevel++;
                } else {
                    formatted += `${indentSize.repeat(indentLevel)}<${element}>\n`;
                }
            });
            return formatted.trim();
        };

        const beautifyCSS = (css) =>
            css
                .replace(/\s+/g, ' ')
                .replace(/;\s*/g, ';\n  ')
                .replace(/\{\s*/g, ' {\n  ')
                .replace(/\}\s*/g, '\n}\n')
                .replace(/,\s*/g, ',\n  ')
                .trim();

        const beautifyJS = (js) => {
            let formatted = '';
            let indentLevel = 0;
            const indentSize = '  ';
            js.split(/([{};])/).forEach((token) => {
                token = token.trim();
                if (token === '{') {
                    formatted += `${indentSize.repeat(indentLevel)}${token}\n`;
                    indentLevel++;
                } else if (token === '}') {
                    indentLevel--;
                    formatted += `${indentSize.repeat(indentLevel)}${token}\n`;
                } else if (token === ';') {
                    formatted += `${token}\n`;
                } else if (token) {
                    formatted += `${indentSize.repeat(indentLevel)}${token}`;
                }
            });
            return formatted.trim();
        };

        const beautifyCode = (type) => {
            const inputCode = getElement('inputCode').value.trim();
            if (!inputCode) {
                notify('Please paste your code in the input box.', 3000);
                return;
            }

            let outputCode = '';
            if (type === 'html') outputCode = beautifyHTML(inputCode);
            else if (type === 'css') outputCode = beautifyCSS(inputCode);
            else if (type === 'js') outputCode = beautifyJS(inputCode);

            getElement('outputCode').value = outputCode;
            notify('Code beautified successfully!');
        };

        const clearAll = () => {
            getElement('inputCode').value = '';
            getElement('outputCode').value = '';
            notify('We cleared all fields.');
        };

        const copyCode = () => {
            const outputCode = getElement('outputCode').value;
            if (!outputCode) {
                notify('There is nothing to copy!', 3000);
                return;
            }
            navigator.clipboard.writeText(outputCode)
                .then(() => notify('Copied successfully ...'))
                .catch(() => notify('Failed to copy!', 3000));
        };