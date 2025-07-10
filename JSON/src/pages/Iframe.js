const Iframe = (props) => {
    let iframeRef = null;
    const writeHTML = (frame) => {
        if (!frame) {
            return;
        }
        iframeRef = frame;
        const doc = frame.contentDocument;
        doc.open();
        doc.write(props.content);
        doc.close();
        frame.style.width = '100%';
        setTimeout(() => {
            frame.style.height = frame.contentWindow?.document?.body ? `${frame.contentWindow.document.body.scrollHeight}px` : '650vh';
        }, 1000);

    };

    return (
        <iframe src="about:blank" id={props.id} name={props.name}
            scrolling="no"
            frameBorder="0"
            title=""
            ref={writeHTML}
        />
    );
};
export default Iframe;