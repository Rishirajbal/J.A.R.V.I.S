2-1261-        document.addEventListener('DOMContentLoaded', function() {
3-1262-            // DOM Elements
4-1263-            const userVideo = document.getElementById('user-video');
5-1264-            const fullUserVideo = document.getElementById('full-user-video');
6-1265-            const voiceCommandButton = document.getElementById('voice-command');
7-1266-            const fullVideoButton = document.getElementById('full-video-button');
8-1267-            const closeFullVideoButton = document.getElementById('close-full-video');
9-1268-            const fullVideoMode = document.getElementById('full-video-mode');
10-1269-            const environmentButton = document.getElementById('environment-button');
11-1270-            const biometricButton = document.getElementById('biometric-button');
12-1271-            const fridayButton = document.getElementById('friday-button');
13-1272-            const endCallButton = document.getElementById('end-call');
14-1273-            const voiceIndicator = document.getElementById('voice-indicator');
15-1274-            const hudResponse = document.getElementById('hud-response');
16-1275-            const responseText = document.getElementById('response-text');
17-1276-            const timeDisplay = document.getElementById('time-display');
18-1277-            const dateDisplay = document.getElementById('date-display');
19-1278-            const voiceStatus = document.getElementById('voice-status');
20-1279-            const chatInput = document.getElementById('chat-input');
21-1280-            const sendButton = document.getElementById('send-button');
22-1281-            const chatMessages = document.getElementById('chat-messages');
23-1282-            const speechTextbox = document.getElementById('speech-textbox');
24-1283-            const environmentPanel = document.getElementById('environment-panel');
25-1284-            const biometricDisplay = document.getElementById('biometric-display');
26-1285-            const gestureArea = document.getElementById('gesture-area');
27-1286-            const gpsLocation = document.getElementById('gps-location');
28-1287-            const temperature = document.getElementById('temperature');
29-1288-            const weather = document.getElementById('weather');
30-1289-            const pressure = document.getElementById('pressure');
31-1290-            const windSpeed = document.getElementById('wind-speed');
32-1291-            const heartRate = document.getElementById('heart-rate');
33-1292-            const stressLevel = document.getElementById('stress-level');
34-1293-            const heartRateGraph = document.getElementById('heart-rate-graph');
35-1294-            const arcReactor = document.getElementById('arc-reactor');
36-1295-            const circuitBoard = document.getElementById('circuit-board');
37-1296-            const neuralNetwork = document.getElementById('neural-network');
38-1297-            const particlesContainer = document.getElementById('particles');
39-1298-            const loadingScreen = document.getElementById('loading-screen');
40-1299-            const loadingProgress = document.getElementById('loading-progress');
41-1300-            const objectDetectionStatus = document.getElementById('object-detection-status');
42-1301-            const faceRecognitionStatus = document.getElementById('face-recognition-status');
43-1302-
44-1303-            // State variables
45-1304-            let localStream = null;
46-1305-            let recognition = null;
47-1306-            let isListening = false;
48-1307-            let isFridayMode = false;
49-1308-            let isEnvironmentActive = false;
50-1309-            let isBiometricActive = false;
51-1310-            let isFullVideoMode = false;
52-1311-            let isEmergencyMode = false;
53-1312-            let heartRateData = [];
54-1313-            let stressLevelData = [];
55-1314-            let audioContext = null;
56-1315-            let voiceProcessor = null;
57-1316-            let objectDetectionModel = null;
58-1317-            let faceDetectionModel = null;
59-1318-            let tesseractWorker = null;
60-1319-            let detectedObjects = [];
61-1320-            let detectedFaces = [];
62-1321-            let weatherDataCache = null;
63-1322-            let locationDataCache = null;
64-1323-
65-1324-            // Initialize all components
66-1325-            async function initializeSystem() {
67-1326-                try {
68-1327-                    // Step 1: Load core components
69-1328-                    updateLoadingProgress(10, "Loading core components...");
70-1329-                    await Promise.all([
71-1330-                        startVideoFeed(),
72-1331-                        initDateTime(),
73-1332-                        createCircuitBoard(),
74-1333-                        createNeuralNetwork(),
75-1334-                        createParticles()
76-1335-                    ]);
77-1336-
78-1337-                    // Step 2: Load AI models
79-1338-                    updateLoadingProgress(30, "Loading AI models...");
80-1339-                    await Promise.all([
81-1340-                        loadObjectDetectionModel(),
82-1341-                        loadFaceRecognitionModel(),
83-1342-                        initTesseractOCR()
84-1343-                    ]);
85-1344-
86-1345-                    // Step 3: Initialize APIs
87-1346-                    updateLoadingProgress(60, "Initializing APIs...");
88-1347-                    await Promise.all([
89-1348-                        initSpeechRecognition(),
90-1349-                        initAudioProcessing(),
91-1350-                        getEnvironmentalData(true) // Initial load
92-1351-                    ]);
93-1352-
94-1353-                    // Step 4: Final setup
95-1354-                    updateLoadingProgress(90, "Finalizing setup...");
96-1355-                    setupEventListeners();
97-1356-                    enableControls();
98-1357-
99-1358-                    // Complete initialization
100-1359-                    updateLoadingProgress(100, "Systems online");
101-1360-                    setTimeout(() => {
102-1361-                        loadingScreen.style.display = 'none';
103-1362-                        addMessage("J.A.R.V.I.S. online. Systems operational. Ready for commands.", 'jarvis');
104-1363-                        showResponse("J.A.R.V.I.S. online. Systems operational.");
105-1364-                    }, 1000);
106-1365-                } catch (error) {
107-1366-                    console.error("Initialization error:", error);
108-1367-                    updateLoadingProgress(0, `Initialization failed: ${error.message}`);
109-1368-                    addMessage("System initialization failed. Some features may not work.", 'jarvis');
110-1369-                }
111-1370-            }
112-1371-
113-1372-            // Update loading progress
114-1373-            function updateLoadingProgress(percent, message) {
115-1374-                loadingProgress.textContent = `${message} (${percent}%)`;
116-1375-            }
117-1376-
118-1377-            // Enable all controls after initialization
119-1378-            function enableControls() {
120-1379-                voiceCommandButton.disabled = false;
121-1380-                fullVideoButton.disabled = false;
122-1381-                environmentButton.disabled = false;
123-1382-                biometricButton.disabled = false;
124-1383-                fridayButton.disabled = false;
125-1384-                endCallButton.disabled = false;
126-1385-                chatInput.disabled = false;
127-1386-                sendButton.disabled = false;
128-1387-            }
129-1388-
130-1389-            // Initialize speech recognition if available
131-1390-            function initSpeechRecognition() {
132-1391-                return new Promise((resolve, reject) => {
133-1392-                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
134-1393-                    
135-1394-                    if (SpeechRecognition) {
136-1395-                        recognition = new SpeechRecognition();
137-1396-                        recognition.continuous = false;
138-1397-                        recognition.interimResults = true;
139-1398-                        recognition.lang = 'en-US';
140-1399-                        
141-1400-                        recognition.onstart = function() {
142-1401-                            isListening = true;
143-1402-                            voiceIndicator.classList.add('active');
144-1403-                            voiceStatus.textContent = "LISTENING";
145-1404-                            if (isFullVideoMode) {
146-1405-                                speechTextbox.textContent = "Listening...";
147-1406-                            }
148-1407-                            activateCircuitEffect();
149-1408-                        };
150-1409-                        
151-1410-                        recognition.onend = function() {
152-1411-                            isListening = false;
153-1412-                            voiceIndicator.classList.remove('active');
154-1413-                            voiceStatus.textContent = "ACTIVE";
155-1414-                            if (isFullVideoMode && speechTextbox.textContent === "Listening...") {
156-1415-                                speechTextbox.textContent = "Ready for voice commands...";
157-1416-                            }
158-1417-                            deactivateCircuitEffect();
159-1418-                        };
160-1419-                        
161-1420-                        recognition.onresult = function(event) {
162-1421-                            const transcript = Array.from(event.results)
163-1422-                                .map(result => result[0])
164-1423-                                .map(result => result.transcript)
165-1424-                                .join('');
166-1425-                            
167-1426-                            if (isFullVideoMode) {
168-1427-                                speechTextbox.textContent = transcript;
169-1428-                            }
170-1429-                            
171-1430-                            if (event.results[0].isFinal) {
172-1431-                                addMessage(transcript, 'user');
173-1432-                                processCommand(transcript);
174-1433-                                
175-1434-                                if (isFullVideoMode) {
176-1435-                                    setTimeout(() => {
177-1436-                                        speechTextbox.textContent = "Processing...";
178-1437-                                    }, 500);
179-1438-                                }
180-1439-                            }
181-1440-                        };
182-1441-                        
183-1442-                        recognition.onerror = function(event) {
184-1443-                            console.error('Speech recognition error', event.error);
185-1444-                            addMessage("Voice recognition error: " + event.error, 'jarvis');
186-1445-                            voiceIndicator.classList.remove('active');
187-1446-                            voiceStatus.textContent = "ERROR";
188-1447-                            
189-1448-                            if (isFullVideoMode) {
190-1449-                                speechTextbox.textContent = "Error: " + event.error;
191-1450-                            }
192-1451-                            deactivateCircuitEffect();
193-1452-                            reject(event.error);
194-1453-                        };
195-1454-                        
196-1455-                        voiceCommandButton.addEventListener('click', toggleVoiceRecognition);
197-1456-                        resolve();
198-1457-                    } else {
199-1458-                        voiceCommandButton.style.display = 'none';
200-1459-                        addMessage("Voice commands not supported in this browser", 'jarvis');
201-1460-                        voiceStatus.textContent = "UNAVAILABLE";
202-1461-                        reject(new Error("SpeechRecognition API not available"));
203-1462-                    }
204-1463-                });
205-1464-            }
206-1465-
207-1466-            // Initialize Web Audio for voice modulation
208-1467-            function initAudioProcessing() {
209-1468-                return new Promise((resolve, reject) => {
210-1469-                    try {
211-1470-                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
212-1471-                        
213-1472-                        if (localStream && localStream.getAudioTracks().length > 0) {
214-1473-                            setupVoiceProcessor();
215-1474-                        }
216-1475-                        resolve();
217-1476-                    } catch (e) {
218-1477-                        console.error('Web Audio API not supported', e);
219-1478-                        reject(e);
220-1479-                    }
221-1480-                });
222-1481-            }
223-1482-
224-1483-            function setupVoiceProcessor() {
225-1484-                if (!audioContext || !localStream) return;
226-1485-                
227-1486-                try {
228-1487-                    const source = audioContext.createMediaStreamSource(localStream);
229-1488-                    voiceProcessor = audioContext.createScriptProcessor(4096, 1, 1);
230-1489-                    
231-1490-                    voiceProcessor.onaudioprocess = function(e) {
232-1491-                        if (isFridayMode) {
233-1492-                            // Simple pitch shift effect for Friday mode
234-1493-                            const inputBuffer = e.inputBuffer;
235-1494-                            const outputBuffer = e.outputBuffer;
236-1495-                            
237-1496-                            for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
238-1497-                                const inputData = inputBuffer.getChannelData(channel);
239-1498-                                const outputData = outputBuffer.getChannelData(channel);
240-1499-                                
241-1500-                                // Simple pitch shift (can be enhanced)
242-1501-                                for (let i = 0; i < inputData.length; i++) {
243-1502-                                    outputData[i] = inputData[i] * (0.5 + Math.random() * 0.5);
244-1503-                                }
245-1504-                            }
246-1505-                        }
247-1506-                    };
248-1507-                    
249-1508-                    source.connect(voiceProcessor);
250-1509-                    voiceProcessor.connect(audioContext.destination);
251-1510-                } catch (e) {
252-1511-                    console.error('Error setting up audio processor', e);
253-1512-                }
254-1513-            }
255-1514-
256-1515-            // Load object detection model
257-1516-            async function loadObjectDetectionModel() {
258-1517-                try {
259-1518-                    updateLoadingProgress(35, "Loading object detection model...");
260-1519-                    objectDetectionModel = await cocoSsd.load();
261-1520-                    objectDetectionStatus.textContent = "READY";
262-1521-                    startObjectDetection();
263-1522-                    return true;
264-1523-                } catch (error) {
265-1524-                    console.error("Error loading object detection model:", error);
266-1525-                    objectDetectionStatus.textContent = "ERROR";
267-1526-                    return false;
268-1527-                }
269-1528-            }
270-1529-
271-1530-            // Load face recognition model
272-1531-            async function loadFaceRecognitionModel() {
273-1532-                try {
274-1533-                    updateLoadingProgress(40, "Loading face recognition model...");
275-1534-                    await faceapi.nets.tinyFaceDetector.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models');
276-1535-                    await faceapi.nets.faceLandmark68Net.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models');
277-1536-                    await faceapi.nets.faceRecognitionNet.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models');
278-1537-                    faceRecognitionStatus.textContent = "READY";
279-1538-                    startFaceDetection();
280-1539-                    return true;
281-1540-                } catch (error) {
282-1541-                    console.error("Error loading face recognition model:", error);
283-1542-                    faceRecognitionStatus.textContent = "ERROR";
284-1543-                    return false;
285-1544-                }
286-1545-            }
287-1546-
288-1547-            // Initialize Tesseract OCR
289-1548-            async function initTesseractOCR() {
290-1549-                try {
291-1550-                    updateLoadingProgress(45, "Initializing OCR engine...");
292-1551-                    tesseractWorker = await Tesseract.createWorker({
293-1552-                        logger: m => {
294-1553-                            if (m.status === 'initializing api') {
295-1554-                                updateLoadingProgress(50, "Initializing OCR engine...");
296-1555-                            }
297-1556-                        }
298-1557-                    });
299-1558-                    await tesseractWorker.loadLanguage('eng');
300-1559-                    await tesseractWorker.initialize('eng');
301-1560-                    return true;
302-1561-                } catch (error) {
303-1562-                    console.error("Error initializing Tesseract:", error);
304-1563-                    return false;
305-1564-                }
306-1565-            }
307-1566-
308-1567-            // Start object detection
309-1568-            async function startObjectDetection() {
310-1569-                if (!objectDetectionModel || !userVideo.srcObject) return;
311-1570-                
312-1571-                try {
313-1572-                    const predictions = await objectDetectionModel.detect(userVideo);
314-1573-                    detectedObjects = predictions;
315-1574-                    updateObjectDetectionDisplay();
316-1575-                    
317-1576-                    // Continue detecting
318-1577-                    requestAnimationFrame(startObjectDetection);
319-1578-                } catch (error) {
320-1579-                    console.error("Object detection error:", error);
321-1580-                    setTimeout(startObjectDetection, 1000);
322-1581-                }
323-1582-            }
324-1583-
325-1584-            // Update object detection display
326-1585-            function updateObjectDetectionDisplay() {
327-1586-                // Clear previous boxes
328-1587-                document.querySelectorAll('.object-detection-box').forEach(box => box.remove());
329-1588-                
330-1589-                // Add new boxes
331-1590-                detectedObjects.forEach(prediction => {
332-1591-                    const box = document.createElement('div');
333-1592-                    box.className = 'object-detection-box';
334-1593-                    box.style.left = `${prediction.bbox[0]}px`;
335-1594-                    box.style.top = `${prediction.bbox[1]}px`;
336-1595-                    box.style.width = `${prediction.bbox[2]}px`;
337-1596-                    box.style.height = `${prediction.bbox[3]}px`;
338-1597-                    box.textContent = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
339-1598-                    userVideo.parentNode.appendChild(box);
340-1599-                });
341-1600-            }
342-1601-
343-1602-            // Start face detection
344-1603-            async function startFaceDetection() {
345-1604-                if (!userVideo.srcObject) return;
346-1605-                
347-1606-                try {
348-1607-                    const detections = await faceapi.detectAllFaces(userVideo, 
349-1608-                        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
350-1609-                    detectedFaces = detections;
351-1610-                    updateFaceDetectionDisplay();
352-1611-                    
353-1612-                    // Continue detecting
354-1613-                    requestAnimationFrame(startFaceDetection);
355-1614-                } catch (error) {
356-1615-                    console.error("Face detection error:", error);
357-1616-                    setTimeout(startFaceDetection, 1000);
358-1617-                }
359-1618-            }
360-1619-
361-1620-            // Update face detection display
362-1621-            function updateFaceDetectionDisplay() {
363-1622-                // Clear previous boxes
364-1623-                document.querySelectorAll('.face-detection-box').forEach(box => box.remove());
365-1624-                
366-1625-                // Add new boxes
367-1626-                detectedFaces.forEach(detection => {
368-1627-                    const box = document.createElement('div');
369-1628-                    box.className = 'face-detection-box';
370-1629-                    const boxRect = detection.detection.box;
371-1630-                    box.style.left = `${boxRect.x}px`;
372-1631-                    box.style.top = `${boxRect.y}px`;
373-1632-                    box.style.width = `${boxRect.width}px`;
374-1633-                    box.style.height = `${boxRect.height}px`;
375-1634-                    box.textContent = `Face (${Math.round(detection.detection.score * 100)}%)`;
376-1635-                    userVideo.parentNode.appendChild(box);
377-1636-                });
378-1637-            }
379-1638-
380-1639-            // Perform OCR on an image
381-1640-            async function performOCR(imageElement) {
382-1641-                if (!tesseractWorker) return "OCR not available";
383-1642-                
384-1643-                try {
385-1644-                    const { data: { text } } = await tesseractWorker.recognize(imageElement);
386-1645-                    return text;
387-1646-                } catch (error) {
388-1647-                    console.error("OCR error:", error);
389-1648-                    return "OCR failed";
390-1649-                }
391-1650-            }
392-1651-
393-1652-            // Start video feed
394-1653-            async function startVideoFeed() {
395-1654-                try {
396-1655-                    localStream = await navigator.mediaDevices.getUserMedia({
397-1656-                        video: {
398-1657-                            facingMode: "user",
399-1658-                            width: { ideal: 1280 },
400-1659-                            height: { ideal: 1280 }
401-1660-                        },
402-1661-                        audio: true
403-1662-                    });
404-1663-                    userVideo.srcObject = localStream;
405-1664-                    fullUserVideo.srcObject = localStream;
406-1665-                    return true;
407-1666-                } catch (error) {
408-1667-                    console.error("Error accessing camera/microphone:", error);
409-1668-                    addMessage("Could not access camera or microphone. Please check permissions.", 'jarvis');
410-1669-                    return false;
411-1670-                }
412-1671-            }
413-1672-
414-1673-            // Create circuit board effect
415-1674-            function createCircuitBoard() {
416-1675-                const svgNS = "http://www.w3.org/2000/svg";
417-1676-                const svg = document.createElementNS(svgNS, "svg");
418-1677-                svg.setAttribute("width", "100%");
419-1678-                svg.setAttribute("height", "100%");
420-1679-                
421-1680-                // Create circuit paths
422-1681-                for (let i = 0; i < 50; i++) {
423-1682-                    const path = document.createElementNS(svgNS, "path");
424-1683-                    const startX = Math.random() * 100;
425-1684-                    const startY = Math.random() * 100;
426-1685-                    let d = `M${startX},${startY}`;
427-1686-                    
428-1687-                    // Create a random circuit path
429-1688-                    for (let j = 0; j < 5 + Math.floor(Math.random() * 10); j++) {
430-1689-                        const x = startX + (Math.random() * 40 - 20);
431-1690-                        const y = startY + (Math.random() * 40 - 20);
432-1691-                        d += ` L${x},${y}`;
433-1692-                    }
434-1693-                    
435-1694-                    path.setAttribute("d", d);
436-1695-                    path.setAttribute("stroke", isFridayMode ? "url(#friday-circuit)" : "url(#jarvis-circuit)");
437-1696-                    path.setAttribute("stroke-width", "0.5");
438-1697-                    path.setAttribute("fill", "none");
439-1698-                    path.setAttribute("opacity", "0");
440-1699-                    path.style.transition = "opacity 0.5s";
441-1700-                    svg.appendChild(path);
442-1701-                }
443-1702-                
444-1703-                // Add gradient definitions
445-1704-                const defs = document.createElementNS(svgNS, "defs");
446-1705-                
447-1706-                const jarvisGradient = document.createElementNS(svgNS, "linearGradient");
448-1707-                jarvisGradient.setAttribute("id", "jarvis-circuit");
449-1708-                jarvisGradient.setAttribute("x1", "0%");
450-1709-                jarvisGradient.setAttribute("y1", "0%");
451-1710-                jarvisGradient.setAttribute("x2", "100%");
452-1711-                jarvisGradient.setAttribute("y2", "100%");
453-1712-                
454-1713-                const stop1 = document.createElementNS(svgNS, "stop");
455-1714-                stop1.setAttribute("offset", "0%");
456-1715-                stop1.setAttribute("stop-color", "#00aaff");
457-1716-                jarvisGradient.appendChild(stop1);
458-1717-                
459-1718-                const stop2 = document.createElementNS(svgNS, "stop");
460-1719-                stop2.setAttribute("offset", "100%");
461-1720-                stop2.setAttribute("stop-color", "#00ffaa");
462-1721-                jarvisGradient.appendChild(stop2);
463-1722-                
464-1723-                defs.appendChild(jarvisGradient);
465-1724-                
466-1725-                const fridayGradient = document.createElementNS(svgNS, "linearGradient");
467-1726-                fridayGradient.setAttribute("id", "friday-circuit");
468-1727-                fridayGradient.setAttribute("x1", "0%");
469-1728-                fridayGradient.setAttribute("y1", "0%");
470-1729-                fridayGradient.setAttribute("x2", "100%");
471-1730-                fridayGradient.setAttribute("y2", "100%");
472-1731-                
473-1732-                const stop3 = document.createElementNS(svgNS, "stop");
474-1733-                stop3.setAttribute("offset", "0%");
475-1734-                stop3.setAttribute("stop-color", "#9c27b0");
476-1735-                fridayGradient.appendChild(stop3);
477-1736-                
478-1737-                const stop4 = document.createElementNS(svgNS, "stop");
479-1738-                stop4.setAttribute("offset", "100%");
480-1739-                stop4.setAttribute("stop-color", "#e91e63");
481-1740-                fridayGradient.appendChild(stop4);
482-1741-                
483-1742-                defs.appendChild(fridayGradient);
484-1743-                
485-1744-                svg.appendChild(defs);
486-1745-                circuitBoard.appendChild(svg);
487-1746-                
488-1747-                // Animate paths
489-1748-                const paths = svg.querySelectorAll('path');
490-1749-                paths.forEach((path, index) => {
491-1750-                    setTimeout(() => {
492-1751-                        path.setAttribute("opacity", "0.3");
493-1752-                    }, index * 100);
494-1753-                });
495-1754-            }
496-1755-
497-1756-            // Create neural network visualization
498-1757-            function createNeuralNetwork() {
499-1758-                const nodes = [];
500-1759-                const connections = [];
501-1760-                
502-1761-                // Create nodes
503-1762-                for (let i = 0; i < 20; i++) {
504-1763-                    const node = document.createElement('div');
505-1764-                    node.className = 'neural-node';
506-1765-                    node.style.left = `${Math.random() * 100}%`;
507-1766-                    node.style.top = `${Math.random() * 100}%`;
508-1767-                    neuralNetwork.appendChild(node);
509-1768-                    nodes.push(node);
510-1769-                }
511-1770-                
512-1771-                // Create connections
513-1772-                for (let i = 0; i < nodes.length; i++) {
514-1773-                    for (let j = i + 1; j < nodes.length; j++) {
515-1774-                        if (Math.random() > 0.7) {
516-1775-                            createConnection(nodes[i], nodes[j]);
517-1776-                        }
518-1777-                    }
519-1778-                }
520-1779-                
521-1780-                // Animate nodes
522-1781-                setInterval(() => {
523-1782-                    nodes.forEach(node => {
524-1783-                        if (Math.random() > 0.9) {
525-1784-                            node.style.transform = 'scale(1.5)';
526-1785-                            node.style.boxShadow = `0 0 10px ${isFridayMode ? 'var(--friday-pink)' : 'var(--jarvis-blue)'}`;
527-1786-                            setTimeout(() => {
528-1787-                                node.style.transform = 'scale(1)';
529-1788-                                node.style.boxShadow = `0 0 5px ${isFridayMode ? 'var(--friday-pink)' : 'var(--jarvis-blue)'}`;
530-1789-                            }, 300);
531-1790-                        }
532-1791-                    });
533-1792-                }, 100);
534-1793-            }
535-1794-            
536-1795-            function createConnection(node1, node2) {
537-1796-                const rect1 = node1.getBoundingClientRect();
538-1797-                const rect2 = node2.getBoundingClientRect();
539-1798-                
540-1799-                const x1 = rect1.left + rect1.width / 2;
541-1800-                const y1 = rect1.top + rect1.height / 2;
542-1801-                const x2 = rect2.left + rect2.width / 2;
543-1802-                const y2 = rect2.top + rect2.height / 2;
544-1803-                
545-1804-                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
546-1805-                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
547-1806-                
548-1807-                const connection = document.createElement('div');
549-1808-                connection.className = 'neural-connection';
550-1809-                connection.style.width = `${length}px`;
551-1810-                connection.style.left = `${x1}px`;
552-1811-                connection.style.top = `${y1}px`;
553-1812-                connection.style.transform = `rotate(${angle}deg)`;
554-1813-                neuralNetwork.appendChild(connection);
555-1814-            }
556-1815-
557-1816-            // Create particle system
558-1817-            function createParticles() {
559-1818-                for (let i = 0; i < 100; i++) {
560-1819-                    createParticle();
561-1820-                }
562-1821-                
563-1822-                setInterval(() => {
564-1823-                    if (Math.random() > 0.7) {
565-1824-                        createParticle();
566-1825-                    }
567-1826-                }, 300);
568-1827-            }
569-1828-            
570-1829-            function createParticle() {
571-1830-                const particle = document.createElement('div');
572-1831-                particle.className = 'particle';
573-1832-                particle.style.left = `${Math.random() * 100}%`;
574-1833-                particle.style.top = `${Math.random() * 100}%`;
575-1834-                
576-1835-                // Random size and opacity
577-1836-                const size = 1 + Math.random() * 3;
578-1837-                particle.style.width = `${size}px`;
579-1838-                particle.style.height = `${size}px`;
580-1839-                particle.style.opacity = 0.2 + Math.random() * 0.5;
581-1840-                
582-1841-                particlesContainer.appendChild(particle);
583-1842-                
584-1843-                // Animate particle
585-1844-                const duration = 3000 + Math.random() * 5000;
586-1845-                const xEnd = parseInt(particle.style.left) + (Math.random() * 200 - 100);
587-1846-                const yEnd = parseInt(particle.style.top) + (Math.random() * 200 - 100);
588-1847-                
589-1848-                const animation = particle.animate([
590-1849-                    { transform: 'translate(0, 0)', opacity: particle.style.opacity },
591-1850-                    { transform: `translate(${xEnd - parseInt(particle.style.left)}px, ${yEnd - parseInt(particle.style.top)}px)`, opacity: 0 }
592-1851-                ], {
593-1852-                    duration: duration,
594-1853-                    easing: 'linear'
595-1854-                });
596-1855-                
597-1856-                animation.onfinish = () => {
598-1857-                    particle.remove();
599-1858-                };
600-1859-            }
601-1860-
602-1861-            // Initialize date and time
603-1862-            function initDateTime() {
604-1863-                updateDateTime();
605-1864-                setInterval(updateDateTime, 1000);
606-1865-            }
607-1866-
608-1867-            // Update date and time
609-1868-            function updateDateTime() {
610-1869-                const now = new Date();
611-1870-                timeDisplay.textContent = now.toLocaleTimeString('en-US', { hour12: false });
612-1871-                dateDisplay.textContent = now.toLocaleDateString('en-US', { 
613-1872-                    year: 'numeric', 
614-1873-                    month: '2-digit', 
615-1874-                    day: '2-digit' 
616-1875-                }).replace(/\//g, '-');
617-1876-            }
618-1877-
619-1878-            // Activate circuit effect when listening
620-1879-            function activateCircuitEffect() {
621-1880-                const paths = circuitBoard.querySelectorAll('path');
622-1881-                paths.forEach(path => {
623-1882-                    path.style.opacity = '0.7';
624-1883-                    path.style.animation = 'pulse 1s infinite alternate';
625-1884-                });
626-1885-            }
627-1886-            
628-1887-            function deactivateCircuitEffect() {
629-1888-                const paths = circuitBoard.querySelectorAll('path');
630-1889-                paths.forEach(path => {
631-1890-                    path.style.opacity = '0.3';
632-1891-                    path.style.animation = 'none';
633-1892-                });
634-1893-            }
635-1894-
636-1895-            // Toggle voice recognition
637-1896-            function toggleVoiceRecognition() {
638-1897-                if (!recognition) return;
639-1898-                
640-1899-                if (isListening) {
641-1900-                    recognition.stop();
642-1901-                    voiceCommandButton.classList.remove('active');
643-1902-                } else {
644-1903-                    try {
645-1904-                        recognition.start();
646-1905-                        voiceCommandButton.classList.add('active');
647-1906-                    } catch (e) {
648-1907-                        console.error('Speech recognition start failed:', e);
649-1908-                    }
650-1909-                }
651-1910-            }
652-1911-
653-1912-            // Toggle full video mode
654-1913-            function toggleFullVideoMode() {
655-1914-                isFullVideoMode = !isFullVideoMode;
656-1915-                fullVideoMode.classList.toggle('active', isFullVideoMode);
657-1916-                fullVideoButton.classList.toggle('active', isFullVideoMode);
658-1917-                
659-1918-                // Start listening in full video mode
660-1919-                if (isFullVideoMode && recognition) {
661-1920-                    recognition.start();
662-1921-                    voiceCommandButton.classList.add('active');
663-1922-                } else if (recognition && isListening) {
664-1923-                    recognition.stop();
665-1924-                    voiceCommandButton.classList.remove('active');
666-1925-                }
667-1926-            }
668-1927-
669-1928-            // Toggle environment panel
670-1929-            function toggleEnvironmentPanel() {
671-1930-                isEnvironmentActive = !isEnvironmentActive;
672-1931-                environmentPanel.classList.toggle('active', isEnvironmentActive);
673-1932-                environmentButton.classList.toggle('active', isEnvironmentActive);
674-1933-                
675-1934-                if (isEnvironmentActive) {
676-1935-                    getEnvironmentalData();
677-1936-                    addMessage("Environmental sensors activated", 'jarvis');
678-1937-                } else {
679-1938-                    addMessage("Environmental sensors deactivated", 'jarvis');
680-1939-                }
681-1940-            }
682-1941-
683-1942-            // Get environmental data from APIs
684-1943-            async function getEnvironmentalData(initialLoad = false) {
685-1944-                if (!isEnvironmentActive && !initialLoad) return;
686-1945-                
687-1946-                try {
688-1947-                    // Get location first
689-1948-                    const position = await new Promise((resolve, reject) => {
690-1949-                        if (navigator.geolocation) {
691-1950-                            navigator.geolocation.getCurrentPosition(resolve, reject);
692-1951-                        } else {
693-1952-                            reject(new Error("Geolocation not available"));
694-1953-                        }
695-1954-                    });
696-1955-                    
697-1956-                    const lat = position.coords.latitude.toFixed(4);
698-1957-                    const lon = position.coords.longitude.toFixed(4);
699-1958-                    locationDataCache = { lat, lon };
700-1959-                    gpsLocation.textContent = `${lat}° N, ${lon}° W`;
701-1960-                    
702-1961-                    // Get weather data from Open-Meteo API
703-1962-                    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
704-1963-                    const weatherData = await weatherResponse.json();
705-1964-                    weatherDataCache = weatherData;
706-1965-                    
707-1966-                    // Update display
708-1967-                    const currentWeather = weatherData.current_weather;
709-1968-                    temperature.textContent = `${Math.round(currentWeather.temperature * 9/5 + 32)}°F`;
710-1969-                    weather.textContent = getWeatherDescription(currentWeather.weathercode);
711-1970-                    windSpeed.textContent = `${currentWeather.windspeed} km/h`;
712-1971-                    
713-1972-                    // Get atmospheric pressure (simulated since Open-Meteo doesn't provide it)
714-1973-                    pressure.textContent = `${Math.round(1013 + (Math.random() * 20 - 10))} hPa`;
715-1974-                    
716-1975-                    // Get location name from Nominatim
717-1976-                    try {
718-1977-                        const locationNameResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
719-1978-                        const locationData = await locationNameResponse.json();
720-1979-                        const locationName = locationData.display_name || `${lat}° N, ${lon}° W`;
721-1980-                        gpsLocation.textContent = locationName;
722-1981-                    } catch (e) {
723-1982-                        console.error("Error getting location name:", e);
724-1983-                    }
725-1984-                    
726-1985-                } catch (error) {
727-1986-                    console.error("Error getting environmental data:", error);
728-1987-                    
729-1988-                    // Fallback to simulated data
730-1989-                    gpsLocation.textContent = "40.7128° N, 74.0060° W";
731-1990-                    temperature.textContent = `${Math.round(60 + Math.random() * 30)}°F`;
732-1991-                    weather.textContent = ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][Math.floor(Math.random() * 5)];
733-1992-                    windSpeed.textContent = `${Math.round(5 + Math.random() * 20)} km/h`;
734-1993-                    pressure.textContent = `${Math.round(980 + Math.random() * 40)} hPa`;
735-1994-                }
736-1995-            }
737-1996-
738-1997-            // Convert weather code to description
739-1998-            function getWeatherDescription(code) {
740-1999-                const weatherCodes = {
741-2000-                    0: "Clear sky",
742-2001-                    1: "Mainly clear",
743-2002-                    2: "Partly cloudy",
744-2003-                    3: "Overcast",
745-2004-                    45: "Fog",
746-2005-                    48: "Depositing rime fog",
747-2006-                    51: "Light drizzle",
748-2007-                    53: "Moderate drizzle",
749-2008-                    55: "Dense drizzle",
750-2009-                    56: "Light freezing drizzle",
751-2010-                    57: "Dense freezing drizzle",
752-2011-                    61: "Slight rain",
753-2012-                    63: "Moderate rain",
754-2013-                    65: "Heavy rain",
755-2014-                    66: "Light freezing rain",
756-2015-                    67: "Heavy freezing rain",
757-2016-                    71: "Slight snow fall",
758-2017-                    73: "Moderate snow fall",
759-2018-                    75: "Heavy snow fall",
760-2019-                    77: "Snow grains",
761-2020-                    80: "Slight rain showers",
762-2021-                    81: "Moderate rain showers",
763-2022-                    82: "Violent rain showers",
764-2023-                    85: "Slight snow showers",
765-2024-                    86: "Heavy snow showers",
766-2025-                    95: "Thunderstorm",
767-2026-                    96: "Thunderstorm with slight hail",
768-2027-                    99: "Thunderstorm with heavy hail"
769-2028-                };
770-2029-                
771-2030-                return weatherCodes[code] || "Unknown weather";
772-2031-            }
773-2032-
774-2033-            // Toggle biometric display
775-2034-            function toggleBiometricDisplay() {
776-2035-                isBiometricActive = !isBiometricActive;
777-2036-                biometricDisplay.classList.toggle('active', isBiometricActive);
778-2037-                biometricButton.classList.toggle('active', isBiometricActive);
779-2038-                gestureArea.classList.toggle('active', isBiometricActive);
780-2039-                
781-2040-                if (isBiometricActive) {
782-2041-                    startBiometricMonitoring();
783-2042-                    addMessage("Biometric monitoring activated", 'jarvis');
784-2043-                } else {
785-2044-                    stopBiometricMonitoring();
786-2045-                    addMessage("Biometric monitoring deactivated", 'jarvis');
787-2046-                }
788-2047-            }
789-2048-
790-2049-            // Start biometric monitoring
791-2050-            function startBiometricMonitoring() {
792-2051-                if (!isBiometricActive) return;
793-2052-                
794-2053-                // Simulate biometric data
795-2054-                updateBiometricData();
796-2055-                setInterval(updateBiometricData, 2000);
797-2056-                
798-2057-                // Update graph
799-2058-                updateBiometricGraph();
800-2059-            }
801-2060-
802-2061-            // Stop biometric monitoring
803-2062-            function stopBiometricMonitoring() {
804-2063-                heartRateData = [];
805-2064-                stressLevelData = [];
806-2065-            }
807-2066-
808-2067-            // Update biometric data
809-2068-            function updateBiometricData() {
810-2069-                // Simulated data - in a real app you'd use actual biometric sensors
811-2070-                const newHeartRate = 60 + Math.floor(Math.random() * 40);
812-2071-                const newStressLevel = Math.floor(Math.random() * 100);
813-2072-                
814-2073-                heartRateData.push(newHeartRate);
815-2074-                stressLevelData.push(newStressLevel);
816-2075-                
817-2076-                // Keep only last 10 readings
818-2077-                if (heartRateData.length > 10) {
819-2078-                    heartRateData.shift();
820-2079-                    stressLevelData.shift();
821-2080-                }
822-2081-                
823-2082-                heartRate.textContent = `${newHeartRate} BPM`;
824-2083-                stressLevel.textContent = `${newStressLevel}%`;
825-2084-            }
826-2085-
827-2086-            // Update biometric graph
828-2087-            function updateBiometricGraph() {
829-2088-                if (!isBiometricActive) return;
830-2089-                
831-2090-                // Create a simple graph visualization
832-2091-                let graphHTML = '';
833-2092-                const maxHR = Math.max(...heartRateData, 100);
834-2093-                
835-2094-                heartRateData.forEach((hr, index) => {
836-2095-                    const height = (hr / maxHR) * 60;
837-2096-                    graphHTML += `<div style="position:absolute;bottom:0;left:${index * 20}px;width:10px;height:${height}px;background-color:${isFridayMode ? 'var(--friday-pink)' : 'var(--hud-green)'};"></div>`;
838-2097-                });
839-2098-                
840-2099-                heartRateGraph.innerHTML = graphHTML;
841-2100-                
842-2101-                setTimeout(updateBiometricGraph, 500);
843-2102-            }
844-2103-
845-2104-            // Toggle Friday mode
846-2105-            function toggleFridayMode() {
847-2106-                isFridayMode = !isFridayMode;
848-2107-                document.body.classList.toggle('friday-mode', isFridayMode);
849-2108-                fridayButton.classList.toggle('active', isFridayMode);
850-2109-                
851-2110-                // Update the title
852-2111-                const hudTitle = document.querySelector('.hud-title');
853-2112-                hudTitle.textContent = isFridayMode 
854-2113-                    ? "F.R.I.D.A.Y. ADVANCED INTERFACE" 
855-2114-                    : "J.A.R.V.I.S. ADVANCED INTERFACE";
856-2115-                
857-2116-                // Update all existing messages
858-2117-                const jarvisMessages = document.querySelectorAll('.jarvis-message');
859-2118-                jarvisMessages.forEach(msg => {
860-2119-                    if (isFridayMode) {
861-2120-                        msg.innerHTML = msg.innerHTML.replace(/J\.A\.R\.V\.I\.S\./g, 'F.R.I.D.A.Y.');
862-2121-                    } else {
863-2122-                        msg.innerHTML = msg.innerHTML.replace(/F\.R\.I\.D\.A\.Y\./g, 'J.A.R.V.I.S.');
864-2123-                    }
865-2124-                });
866-2125-                
867-2126-                // Update voice modulation
868-2127-                if (voiceProcessor && localStream) {
869-2128-                    if (isFridayMode) {
870-2129-                        setupVoiceProcessor();
871-2130-                    } else {
872-2131-                        if (voiceProcessor) {
873-2132-                            voiceProcessor.disconnect();
874-2133-                            voiceProcessor = null;
875-2134-                        }
876-2135-                    }
877-2136-                }
878-2137-                
879-2138-                if (isFridayMode) {
880-2139-                    addMessage("F.R.I.D.A.Y. online. Systems operational.", 'jarvis');
881-2140-                    showResponse("F.R.I.D.A.Y. online. Systems operational.");
882-2141-                } else {
883-2142-                    addMessage("J.A.R.V.I.S. back online. Systems operational.", 'jarvis');
884-2143-                    showResponse("J.A.R.V.I.S. back online. Systems operational.");
885-2144-                }
886-2145-            }
887-2146-
888-2147-            // Toggle emergency mode
889-2148-            function toggleEmergencyMode() {
890-2149-                isEmergencyMode = !isEmergencyMode;
891-2150-                document.body.classList.toggle('emergency-mode', isEmergencyMode);
892-2151-                
893-2152-                if (isEmergencyMode) {
894-2153-                    addMessage("EMERGENCY PROTOCOL ACTIVATED", 'jarvis');
895-2154-                    showResponse("Emergency mode engaged. All systems at maximum capacity.");
896-2155-                } else {
897-2156-                    addMessage("Emergency protocol deactivated", 'jarvis');
898-2157-                    showResponse("Systems returning to normal operation.");
899-2158-                }
900-2159-            }
901-2160-
902-2161-            // End call
903-2162-            function endCall() {
904-2163-                if (localStream) {
905-2164-                    localStream.getTracks().forEach(track => track.stop());
906-2165-                    localStream = null;
907-2166-                }
908-2167-                
909-2168-                if (isListening && recognition) {
910-2169-                    recognition.stop();
911-2170-                }
912-2171-                
913-2172-                addMessage("Connection terminated", 'jarvis');
914-2173-                showResponse("Connection terminated. Goodbye.");
915-2174-                
916-2175-                // In a real app, you'd want to handle this differently
917-2176-                setTimeout(() => {
918-2177-                    document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:white;font-size:24px;">Connection ended</div>';
919-2178-                }, 2000);
920-2179-            }
921-2180-
922-2181-            // Process command
923-2182-            async function processCommand(command) {
924-2183-                const lowerCmd = command.toLowerCase();
925-2184-                let response = "";
926-2185-                
927-2186-                // System commands
928-2187-                if (lowerCmd.includes('diagnostic') || lowerCmd.includes('system status')) {
929-2188-                    response = `System diagnostic complete. All systems nominal. 
930-2189-                    CPU: ${Math.floor(Math.random() * 30) + 10}% | 
931-2190-                    Memory: ${Math.floor(Math.random() * 30) + 50}% | 
932-2191-                    Power: ${Math.floor(Math.random() * 20) + 80}%`;
933-2192-                }
934-2193-                else if (lowerCmd.includes('time') || lowerCmd.includes('what time is it')) {
935-2194-                    response = "Current time is " + new Date().toLocaleTimeString();
936-2195-                }
937-2196-                else if (lowerCmd.includes('date') || lowerCmd.includes('what day is it')) {
938-2197-                    response = "Today is " + new Date().toLocaleDateString('en-US', { 
939-2198-                        weekday: 'long', 
940-2199-                        year: 'numeric', 
941-2200-                        month: 'long', 
942-2201-                        day: 'numeric' 
943-2202-                    });
944-2203-                }
945-2204-                else if (lowerCmd.includes('hello') || lowerCmd.includes('hi') || lowerCmd.includes('hey')) {
946-2205-                    response = "Good " + getTimeOfDay() + ", sir. How may I assist you?";
947-2206-                }
948-2207-                else if (lowerCmd.includes('who are you') || lowerCmd.includes('what are you')) {
949-2208-                    response = isFridayMode 
950-2209-                        ? "I am F.R.I.D.A.Y., your personal AI assistant." 
951-2210-                        : "I am J.A.R.V.I.S., Just A Rather Very Intelligent System. Your personal AI assistant.";
952-2211-                }
953-2212-                else if (lowerCmd.includes('thank')) {
954-2213-                    response = "You're welcome, sir. Always at your service.";
955-2214-                }
956-2215-                else if (lowerCmd.includes('activate') && lowerCmd.includes('protocol')) {
957-2216-                    if (lowerCmd.includes('house party')) {
958-2217-                        response = "Activating House Party Protocol. Deploying all suits.";
959-2218-                    } else if (lowerCmd.includes('clean slate')) {
960-2219-                        response = "Clean Slate Protocol initiated. All systems reset.";
961-2220-                    } else if (lowerCmd.includes('emergency')) {
962-2221-                        toggleEmergencyMode();
963-2222-                        return;
964-2223-                    } else {
965-2224-                        response = "Please specify protocol name for activation.";
966-2225-                    }
967-2226-                }
968-2227-                else if (lowerCmd.includes('environment') || lowerCmd.includes('weather')) {
969-2228-                    toggleEnvironmentPanel();
970-2229-                    response = isEnvironmentActive ? "Environmental sensors activated" : "Environmental sensors deactivated";
971-2230-                }
972-2231-                else if (lowerCmd.includes('biometric') || lowerCmd.includes('vital')) {
973-2232-                    toggleBiometricDisplay();
974-2233-                    response = isBiometricActive ? "Biometric monitoring activated" : "Biometric monitoring deactivated";
975-2234-                }
976-2235-                else if (lowerCmd.includes('friday') || lowerCmd.includes('switch')) {
977-2236-                    toggleFridayMode();
978-2237-                    return; // Response handled in toggleFridayMode
979-2238-                }
980-2239-                else if (lowerCmd.includes('what do you see') || lowerCmd.includes('detect objects')) {
981-2240-                    if (detectedObjects.length > 0) {
982-2241-                        const objectsList = detectedObjects.map(obj => 
983-2242-                            `${obj.class} (${Math.round(obj.score * 100)}%)`).join(', ');
984-2243-                        response = `I see: ${objectsList}`;
985-2244-                    } else {
986-2245-                        response = "No objects detected currently.";
987-2246-                    }
988-2247-                }
989-2248-                else if (lowerCmd.includes('who is here') || lowerCmd.includes('detect faces')) {
990-2249-                    if (detectedFaces.length > 0) {
991-2250-                        response = `I detect ${detectedFaces.length} face${detectedFaces.length !== 1 ? 's' : ''} in view.`;
992-2251-                    } else {
993-2252-                        response = "No faces detected currently.";
994-2253-                    }
995-2254-                }
996-2255-                else if (lowerCmd.includes('translate') && lowerCmd.includes('to')) {
997-2256-                    // Extract language and text
998-2257-                    const langMatch = command.match(/to\s+(\w+)/i);
999-2258-                    const textMatch = command.match(/translate\s+"?([^"]+)"?\s+to/i) || 
1000-2259-                                     command.match(/translate\s+"(.+)"\s+to/i);
1001-2260-                    
1002-2261-                    if (langMatch && textMatch) {
1003-2262-                        const lang = langMatch[1].toLowerCase();
1004-2263-                        const text = textMatch[1];
1005-2264-                        response = await translateText(text, lang);
1006-2265-                    } else {
1007-2266-                        response = "Please specify both text and target language for translation.";
1008-2267-                    }
1009-2268-                }
1010-2269-                else if (lowerCmd.includes('generate') || lowerCmd.includes('create') || lowerCmd.includes('write')) {
1011-2270-                    // Use AI to generate content
1012-2271-                    const prompt = command.replace(/generate|create|write/gi, '').trim();
1013-2272-                    if (prompt) {
1014-2273-                        response = await generateAIResponse(prompt);
1015-2274-                    } else {
1016-2275-                        response = "Please specify what you'd like me to generate.";
1017-2276-                    }
1018-2277-                }
1019-2278-                else {
1020-2279-                    // Try to get a response from Hugging Face inference API
1021-2280-                    try {
1022-2281-                        response = await getAIResponse(command);
1023-2282-                    } catch (error) {
1024-2283-                        console.error("AI response error:", error);
1025-2284-                        
1026-2285-                        // Fallback to snarky responses
1027-2286-                        if (Math.random() < 0.3) {
1028-2287-                            const snarkyResponses = [
1029-2288-                                "I'm sorry, I didn't quite catch that. Perhaps you'd like to try again?",
1030-2289-                                "That's an interesting command. Unfortunately, I have no idea what to do with it.",
1031-2290-                                "Shall I call Pepper to help with that?",
1032-2291-                                "I could do that, but I'm not sure why you'd want me to.",
1033-2292-                                "Command received. Processing... Just kidding, I'm ignoring that one."
1034-2293-                            ];
1035-2294-                            response = snarkyResponses[Math.floor(Math.random() * snarkyResponses.length)];
1036-2295-                        } else {
1037-2296-                            response = "Command received: '" + command + "'. Processing request...";
1038-2297-                        }
1039-2298-                    }
1040-2299-                }
1041-2300-                
1042-2301-                addMessage(response, 'jarvis');
1043-2302-                showResponse(response);
1044-2303-                
1045-2304-                if (isFullVideoMode) {
1046-2305-                    speechTextbox.textContent = response;
1047-2306-                    setTimeout(() => {
1048-2307-                        speechTextbox.textContent = "Ready for voice commands...";
1049-2308-                    }, 3000);
1050-2309-                }
1051-2310-            }
1052-2311-
1053-2312-            // Get AI response from Hugging Face
1054-2313-            async function getAIResponse(prompt) {
1055-2314-                try {
1056-2315-                    // For demo purposes, we'll use a simple mock response
1057-2316-                    // In a real app, you'd call the Hugging Face Inference API
1058-2317-                    const mockResponses = [
1059-2318-                        `I've processed your request about "${prompt}". Here's what I found...`,
1060-2319-                        `Analyzing "${prompt}"... My assessment is that this requires further consideration.`,
1061-2320-                        `Regarding "${prompt}", my databases indicate several possible interpretations.`,
1062-2321-                        `"${prompt}" is an interesting topic. Let me provide some insights.`,
1063-2322-                        `Processing your query about "${prompt}". Stand by for analysis.`
1064-2323-                    ];
1065-2324-                    
1066-2325-                    // Simulate API delay
1067-2326-                    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
1068-2327-                    
1069-2328-                    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
1070-2329-                } catch (error) {
1071-2330-                    throw error;
1072-2331-                }
1073-2332-            }
1074-2333-
1075-2334-            // Generate AI response for creative tasks
1076-2335-            async function generateAIResponse(prompt) {
1077-2336-                try {
1078-2337-                    // For demo purposes, we'll use a simple mock response
1079-2338-                    // In a real app, you'd call an AI text generation API
1080-2339-                    const mockResponses = [
1081-2340-                        `Here's what I generated based on "${prompt}": [Creative content would appear here]`,
1082-2341-                        `Creating content about "${prompt}"... Done. Here's the result.`,
1083-2342-                        `I've composed the following about "${prompt}". Let me know if you'd like adjustments.`,
1084-2343-                        `Based on your request for "${prompt}", I've generated this output.`
1085-2344-                    ];
1086-2345-                    
1087-2346-                    // Simulate generation delay
1088-2347-                    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));
1089-2348-                    
1090-2349-                    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
1091-2350-                } catch (error) {
1092-2351-                    console.error("Content generation error:", error);
1093-2352-                    return "I encountered an error while generating content. Please try again.";
1094-2353-                }
1095-2354-            }
1096-2355-
1097-2356-            // Translate text using LibreTranslate (mock for demo)
1098-2357-            async function translateText(text, targetLang) {
1099-2358-                try {
1100-2359-                    // For demo purposes, we'll use a simple mock response
1101-2360-                    // In a real app, you'd call the LibreTranslate API or similar
1102-2361-                    const mockTranslations = {
1103-2362-                        spanish: `[Spanish translation of "${text}"]`,
1104-2363-                        french: `[French translation of "${text}"]`,
1105-2364-                        german: `[German translation of "${text}"]`,
1106-2365-                        chinese: `[Chinese translation of "${text}"]`,
1107-2366-                        japanese: `[Japanese translation of "${text}"]`
1108-2367-                    };
1109-2368-                    
1110-2369-                    // Simulate API delay
1111-2370-                    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
1112-2371-                    
1113-2372-                    return mockTranslations[targetLang] || `Translation to ${targetLang} not available in this demo.`;
1114-2373-                } catch (error) {
1115-2374-                    console.error("Translation error:", error);
1116-2375-                    return "Translation service unavailable at the moment.";
1117-2376-                }
1118-2377-            }
1119-2378-
1120-2379-            // Add message to chat
1121-2380-            function addMessage(text, sender) {
1122-2381-                const messageDiv = document.createElement('div');
1123-2382-                messageDiv.classList.add('message');
1124-2383-                messageDiv.classList.add(sender === 'user' ? 'user-message' : 'jarvis-message');
1125-2384-                
1126-2385-                if (sender === 'jarvis') {
1127-2386-                    messageDiv.innerHTML = isFridayMode 
1128-2387-                        ? `<span class="jarvis">F.R.I.D.A.Y.:</span> ${text}` 
1129-2388-                        : `<span class="jarvis">J.A.R.V.I.S.:</span> ${text}`;
1130-2389-                } else {
1131-2390-                    messageDiv.textContent = `USER: ${text}`;
1132-2391-                }
1133-2392-                
1134-2393-                chatMessages.appendChild(messageDiv);
1135-2394-                chatMessages.scrollTop = chatMessages.scrollHeight;
1136-2395-                
1137-2396-                // Animate neural network when receiving messages
1138-2397-                if (sender === 'jarvis') {
1139-2398-                    animateNeuralNetwork();
1140-2399-                }
1141-2400-            }
1142-2401-
1143-2402-            // Animate neural network
1144-2403-            function animateNeuralNetwork() {
1145-2404-                const nodes = neuralNetwork.querySelectorAll('.neural-node');
1146-2405-                const connections = neuralNetwork.querySelectorAll('.neural-connection');
1147-2406-                
1148-2407-                // Pulse random nodes
1149-2408-                for (let i = 0; i < 3; i++) {
1150-2409-                    const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
1151-2410-                    randomNode.style.transform = 'scale(1.5)';
1152-2411-                    randomNode.style.boxShadow = `0 0 10px ${isFridayMode ? 'var(--friday-pink)' : 'var(--jarvis-blue)'}`;
1153-2412-                    
1154-2413-                    setTimeout(() => {
1155-2414-                        randomNode.style.transform = 'scale(1)';
1156-2415-                        randomNode.style.boxShadow = `0 0 5px ${isFridayMode ? 'var(--friday-pink)' : 'var(--jarvis-blue)'}`;
1157-2416-                    }, 300);
1158-2417-                }
1159-2418-                
1160-2419-                // Highlight connections
1161-2420-                connections.forEach(conn => {
1162-2421-                    conn.style.opacity = '0.7';
1163-2422-                    conn.style.backgroundColor = isFridayMode ? 'var(--friday-pink)' : 'var(--jarvis-blue)';
1164-2423-                    
1165-2424-                    setTimeout(() => {
1166-2425-                        conn.style.opacity = '0.3';
1167-2426-                        conn.style.backgroundColor = isFridayMode ? 'var(--friday-purple)' : 'var(--jarvis-blue)';
1168-2427-                    }, 500);
1169-2428-                });
1170-2429-            }
1171-2430-
1172-2431-            // Show HUD response
1173-2432-            function showResponse(text) {
1174-2433-                responseText.textContent = text;
1175-2434-                hudResponse.classList.add('show');
1176-2435-                
1177-2436-                setTimeout(() => {
1178-2437-                    hudResponse.classList.remove('show');
1179-2438-                }, 3000);
1180-2439-            }
1181-2440-
1182-2441-            // Get time of day
1183-2442-            function getTimeOfDay() {
1184-2443-                const hour = new Date().getHours();
1185-2444-                if (hour < 12) return 'morning';
1186-2445-                if (hour < 18) return 'afternoon';
1187-2446-                return 'evening';
1188-2447-            }
1189-2448-
1190-2449-            // Handle text input
1191-2450-            function handleTextInput() {
1192-2451-                const text = chatInput.value.trim();
1193-2452-                if (text) {
1194-2453-                    addMessage(text, 'user');
1195-2454-                    processCommand(text);
1196-2455-                    chatInput.value = '';
1197-2456-                }
1198-2457-            }
1199-2458-
1200-2459-            // Setup event listeners
1201-2460-            function setupEventListeners() {
1202-2461-                fullVideoButton.addEventListener('click', toggleFullVideoMode);
1203-2462-                closeFullVideoButton.addEventListener('click', toggleFullVideoMode);
1204-2463-                environmentButton.addEventListener('click', toggleEnvironmentPanel);
1205-2464-                biometricButton.addEventListener('click', toggleBiometricDisplay);
1206-2465-                fridayButton.addEventListener('click', toggleFridayMode);
1207-2466-                endCallButton.addEventListener('click', endCall);
1208-2467-                sendButton.addEventListener('click', handleTextInput);
1209-2468-                chatInput.addEventListener('keypress', function(e) {
1210-2469-                    if (e.key === 'Enter') {
1211-2470-                        handleTextInput();
1212-2471-                    }
1213-2472-                });
1214-2473-
1215-2474-                // Gesture area events
1216-2475-                gestureArea.addEventListener('click', function() {
1217-2476-                    if (isBiometricActive) {
1218-2477-                        addMessage("Gesture detected: Click", 'jarvis');
1219-2478-                        showResponse("Gesture command received");
1220-2479-                    }
1221-2480-                });
1222-2481-                
1223-2482-                gestureArea.addEventListener('mouseenter', function() {
1224-2483-                    if (isBiometricActive) {
1225-2484-                        gestureArea.style.borderStyle = 'solid';
1226-2485-                        gestureArea.style.opacity = '1';
1227-2486-                    }
1228-2487-                });
1229-2488-                
1230-2489-                gestureArea.addEventListener('mouseleave', function() {
1231-2490-                    if (isBiometricActive) {
1232-2491-                        gestureArea.style.borderStyle = 'dashed';
1233-2492-                        gestureArea.style.opacity = '0.7';
1234-2493-                    }
1235-2494-                });
1236-2495-            }
1237-2496-
1238-2497-            // Start the initialization process
1239-2498-            initializeSystem();
1240-2499-        });
