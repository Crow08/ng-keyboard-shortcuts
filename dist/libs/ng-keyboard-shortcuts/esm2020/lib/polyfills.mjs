(function () {
    if (typeof Element === 'undefined') {
        return;
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            let el = this;
            do {
                if (el.matches(s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();
if (!Array.prototype.flat) {
    Array.prototype.flat = function (depth) {
        var flattend = [];
        (function flat(array, depth) {
            for (let el of array) {
                if (Array.isArray(el) && depth > 0) {
                    flat(el, depth - 1);
                }
                else {
                    flattend.push(el);
                }
            }
        })(this, Math.floor(depth) || 1);
        return flattend;
    };
}
if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function () {
        return Array.prototype.map.apply(this, arguments).flat(1);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZy1rZXlib2FyZC1zaG9ydGN1dHMvc3JjL2xpYi9wb2x5ZmlsbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQztJQUNHLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO1FBQ2hDLE9BQU87S0FDVjtJQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtRQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU87WUFDcEIsT0FBTyxDQUFDLFNBQWlCLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztLQUMvRjtJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtRQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWQsR0FBRztnQkFDQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2YsT0FBTyxFQUFFLENBQUM7aUJBQ2I7Z0JBQ0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUMxQyxRQUFRLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0tBQ0w7QUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsSUFBSSxDQUFFLEtBQUssQ0FBQyxTQUFpQixDQUFDLElBQUksRUFBRTtJQUMvQixLQUFLLENBQUMsU0FBaUIsQ0FBQyxJQUFJLEdBQUcsVUFBVSxLQUFLO1FBQzNDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLO1lBQ3ZCLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFO2dCQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDLENBQUM7Q0FDTDtBQUVELElBQUksQ0FBRSxLQUFLLENBQUMsU0FBaUIsQ0FBQyxPQUFPLEVBQUU7SUFDbEMsS0FBSyxDQUFDLFNBQWlCLENBQUMsT0FBTyxHQUFHO1FBQy9CLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxyXG4gICAgICAgICAgICAoRWxlbWVudC5wcm90b3R5cGUgYXMgYW55KS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XHJcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwubWF0Y2hlcyhzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5pZiAoIShBcnJheS5wcm90b3R5cGUgYXMgYW55KS5mbGF0KSB7XHJcbiAgICAoQXJyYXkucHJvdG90eXBlIGFzIGFueSkuZmxhdCA9IGZ1bmN0aW9uIChkZXB0aCkge1xyXG4gICAgICAgIHZhciBmbGF0dGVuZCA9IFtdO1xyXG4gICAgICAgIChmdW5jdGlvbiBmbGF0KGFycmF5LCBkZXB0aCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbCBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpICYmIGRlcHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYXQoZWwsIGRlcHRoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5kLnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkodGhpcywgTWF0aC5mbG9vcihkZXB0aCkgfHwgMSk7XHJcbiAgICAgICAgcmV0dXJuIGZsYXR0ZW5kO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKCEoQXJyYXkucHJvdG90eXBlIGFzIGFueSkuZmxhdE1hcCkge1xyXG4gICAgKEFycmF5LnByb3RvdHlwZSBhcyBhbnkpLmZsYXRNYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuYXBwbHkodGhpcywgYXJndW1lbnRzKS5mbGF0KDEpO1xyXG4gICAgfTtcclxufVxyXG5cclxuIl19