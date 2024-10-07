// Función para obtener la información del navegador y sistema operativo
function getBrowserInfo() {
    let browserInfo = document.getElementById('browserInfo');

    // Verifica si el navegador soporta userAgentData
    if (navigator.userAgentData) {
        let brands = navigator.userAgentData.brands.map(brand => `${brand.brand} ${brand.version}`);
        let platform = navigator.userAgentData.platform;

        browserInfo.innerHTML = `
            <strong>Navegador:</strong> ${brands[0]}<br>
            <strong>Sistema Operativo:</strong> ${platform}
        `;
        navigator.userAgentData
            .getHighEntropyValues([
                "architecture",
                "model",
                "platform",
                "platformVersion",
                "fullVersionList",
            ])
            .then((ua) => {
                const majorVersion = parseInt(ua.platformVersion.split('.')[0]);
                let OSVersion = "";
                if (majorVersion >= 13) {
                    OSVersion =  ' 11';
                } else if (majorVersion > 0) {
                    OSVersion =  ' 10';
                } else {
                    OSVersion =  ' 7/8/8.1';
                }
                browserInfo.innerHTML += ` ${OSVersion}
        `;
            });

    } else {
        // Uso de userAgent como respaldo si userAgentData no está disponible
        let userAgent = navigator.userAgent;
        let os = "Sistema operativo desconocido";
        let browser = "Navegador desconocido";

        // Detección básica del sistema operativo
        if (userAgent.indexOf("Win") !== -1) os = "Windows";
        else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
        else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
        else if (userAgent.indexOf("Android") !== -1) os = "Android";
        else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

        // Detección básica del navegador
        if (userAgent.indexOf("Chrome") !== -1) browser = "Google Chrome";
        else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
        else if (userAgent.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
        else if (userAgent.indexOf("MSIE") !== -1 || !!document.documentMode) browser = "Internet Explorer"; // IE < 11
        else if (userAgent.indexOf("Edg") !== -1) browser = "Microsoft Edge";

        browserInfo.innerHTML = `
            <strong>Navegador:</strong> ${browser}<br>
            <strong>Sistema Operativo:</strong> ${os}
        `;
    }
}

// Llamar la función al cargar la página
window.onload = getBrowserInfo;
