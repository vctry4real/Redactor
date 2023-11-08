function redactContent() {
    const originalText = document.getElementById('redact-input').value;
    const wordsToRedact = document.getElementById('replacement-input').value.split(' ');
    const replaceWith = document.getElementById('replace-with').value || '****';

    const startTime = new Date().getTime();

    let redactedText = originalText;
    let wordsScanned = 0;
    let wordsRedacted = 0;
    wordsToRedact.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        redactedText = redactedText.replace(regex, replaceWith);
        wordsScanned += redactedText.match(regex) ? redactedText.match(regex).length : 0;
        wordsRedacted += redactedText.match(new RegExp(replaceWith, 'g')) ? redactedText.match(new RegExp(replaceWith, 'g')).length : 0;
    });

    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // in seconds

    document.getElementById('redacted-content').innerText = "Redacted Text: \n" + redactedText;
    document.getElementById('stats').innerHTML = `<p>Words scanned: ${wordsScanned}</p>
                                                 <p>Words redacted: ${wordsRedacted}</p>
                                                 <p>Total characters redacted: ${wordsRedacted * replaceWith.length}</p>
                                                 <p>Time taken: ${timeTaken} seconds</p>`;
}
