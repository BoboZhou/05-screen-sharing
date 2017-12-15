
chrome.runtime.onConnect.addListener(function (port) {
    function onResponse( sourceId ) {
        if(!sourceId || !sourceId.length) {
            port.postMessage('PermissionDeniedError');
        } else {
            port.postMessage({ sourceId: sourceId });
        }
    }

    function onMessage( msg ) {

        if( msg === 'test' ) {
            port.postMessage({result:'ok'});;
        }
        if( msg !== 'requestScreenSourceId' ) {
            return;
        }
        chrome.desktopCapture.chooseDesktopMedia(
            ['screen', 'window'],
            port.sender.tab,
            onResponse
        );
    }

    port.onMessage.addListener(onMessage );
});
