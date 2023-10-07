export function createModalBackdrop(el: HTMLElement) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    backdrop.style.zIndex = "1000";
    backdrop.style.display = "block";
    el.appendChild(backdrop);

    return () => {
        el.removeChild(backdrop);

    };
}