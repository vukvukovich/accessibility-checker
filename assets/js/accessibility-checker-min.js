class AccessibilityCheckerDisableHTML{constructor(){this.disableStylesButton=document.querySelector("#edac-highlight-disable-styles"),this.closePanel=document.querySelector("#edac-highlight-panel-close"),this.stylesDisabled=!1,this.originalCss=[],this.init()}init(){this.disableStylesButton.addEventListener("click",(()=>{this.stylesDisabled?this.enableStyles():this.disableStyles()})),this.closePanel.addEventListener("click",(()=>this.enableStyles()))}disableStyles(){this.originalCss=Array.from(document.head.querySelectorAll('style[type="text/css"], style, link[rel="stylesheet"]')),document.querySelectorAll('*[style]:not([class^="edac"])').forEach((function(t){t.removeAttribute("style")})),this.originalCss=this.originalCss.filter((function(t){return"edac-css"!==t.id&&"dashicons-css"!==t.id})),document.head.dataset.css=this.originalCss,this.originalCss.forEach((function(t){t.remove()})),this.stylesDisabled=!0,this.disableStylesButton.textContent="Enable Styles"}enableStyles(){this.originalCss.forEach((function(t){if("STYLE"===t.tagName)document.head.appendChild(t.cloneNode(!0));else{const e=document.createElement("link");e.rel="stylesheet",e.href=t.href,document.head.appendChild(e)}})),this.stylesDisabled=!1,this.disableStylesButton.textContent="Disable Styles"}}class AccessibilityCheckerHighlight{constructor(){this.addHighlightPanel(),this.nextButton=document.querySelector("#edac-highlight-next"),this.previousButton=document.querySelector("#edac-highlight-previous"),this.panelToggle=document.querySelector("#edac-highlight-panel-toggle"),this.closePanel=document.querySelector("#edac-highlight-panel-close"),this.panelDescription=document.querySelector("#edac-highlight-panel-description"),this.panelControls=document.querySelector("#edac-highlight-panel-controls"),this.issues=null,this.currentButtonIndex=0,this.descriptionTimeout,this.init()}init(){this.highlightButtonFocus(),this.highlightButtonFocusOut(),this.nextButton.addEventListener("click",(()=>this.highlightFocusNext())),this.previousButton.addEventListener("click",(()=>this.highlightFocusPrevious())),this.panelToggle.addEventListener("click",(()=>this.panelOpen())),this.closePanel.addEventListener("click",(()=>this.panelClose()))}findElement(t,e){const i=t.object,n=(new DOMParser).parseFromString(i,"text/html");console.log(n);const s=n.body.firstElementChild;if(!s)return null;const l=document.body.querySelectorAll("*");for(const i of l)if(i.outerHTML===s.outerHTML)return this.wrapElement(i,t),this.addTooltip(i,t,e),i;return null}highlightAjax(){const t=new XMLHttpRequest,e=edac_script_vars.ajaxurl+"?action=edac_frontend_highlight_ajax&post_id="+edac_script_vars.postID+"&nonce="+edac_script_vars.nonce;t.open("GET",e),t.onload=function(){if(200===t.status){const e=JSON.parse(t.responseText);if(!0===e.success){let t=JSON.parse(e.data);console.log(t),this.issues=t,t.forEach(function(t,e){const i=this.findElement(t,e);console.log(i)}.bind(this))}else console.log(e)}else console.log("Request failed.  Returned status of "+t.status)}.bind(this),t.send()}wrapElement(t,e){const i=t.parentNode,n=document.createElement("div");n.className=`edac-highlight edac-highlight-${e.rule_type}`,i.insertBefore(n,t),n.appendChild(t)}unwrapElements(){const t=document.querySelectorAll(".edac-highlight");for(let e=0;e<t.length;e++){const i=t[e],n=i.parentNode,s=n.parentNode;"DIV"===s.tagName&&s.classList.contains("edac-highlight")&&(n.removeChild(i),s.parentNode.insertBefore(i,s),s.parentNode.removeChild(s))}}removeHighlightButtons(){const t=document.querySelectorAll(".edac-highlight-btn");for(let e=0;e<t.length;e++)t[e].remove()}addTooltip(t,e,i){const n=`\n\t\t\t<button class="edac-highlight-btn edac-highlight-btn-${e.rule_type}"\n\t\t\t\t\taria-label="${e.rule_title}"\n\t\t\t\t\taria-expanded="false"\n\t\t\t\t\tdata-issue-id="${i}"\n\t\t\t\t\taria-controls="edac-highlight-tooltip-${e.id}"></button>\n\t\t`;t.insertAdjacentHTML("beforebegin",n)}addHighlightPanel(){document.body.insertAdjacentHTML("afterbegin",'\n\t\t\t<div class="edac-highlight-panel">\n\t\t\t<button id="edac-highlight-panel-toggle" class="edac-highlight-panel-toggle" title="Toggle accessibility tools"></button>\n\t\t\t<div id="edac-highlight-panel-description" class="edac-highlight-panel-description">\n\t\t\t\t<button class="edac-highlight-panel-description-close">Close</button>\n\t\t\t\t<div class="edac-highlight-panel-description-title"></div>\n\t\t\t\t<div class="edac-highlight-panel-description-content"></div>\t\t\t\n\t\t\t</div>\n\t\t\t<div id="edac-highlight-panel-controls" class="edac-highlight-panel-controls">\t\t\t\t\t\n\t\t\t\t<button id="edac-highlight-panel-close" class="edac-highlight-panel-close" aria-label="Close accessibility highlights panel">Close</button><br />\n\t\t\t\t<button id="edac-highlight-previous"><span aria-hidden="true">« </span>previous</button>\n\t\t\t\t<button id="edac-highlight-next">Next<span aria-hidden="true"> »</span></button><br />\n\t\t\t\t<button id="edac-highlight-disable-styles">Disable Styles</button>\n\t\t\t</div>\n\t\t\t</div>\n\t\t')}highlightFocusNext(){const t=document.querySelectorAll(".edac-highlight-btn");this.currentButtonIndex=(this.currentButtonIndex+1)%t.length,t[this.currentButtonIndex].focus(),console.log("Visible: "+this.isElementVisible(t[this.currentButtonIndex])),console.log("Hidden: "+this.isElementHidden(t[this.currentButtonIndex]))}highlightFocusPrevious(){const t=document.querySelectorAll(".edac-highlight-btn");this.currentButtonIndex=(this.currentButtonIndex-1+t.length)%t.length,t[this.currentButtonIndex].focus()}isElementVisible(t){const e=t.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight,n=window.innerWidth||document.documentElement.clientWidth;return e.top>=0&&e.left>=0&&e.bottom<=i&&e.right<=n}isElementHidden(t){return"none"===window.getComputedStyle(t).display}panelOpen(){this.panelControls.style.display="block",this.panelToggle.style.display="none",this.highlightAjax()}panelClose(){this.panelControls.style.display="none",this.panelDescription.style.display="none",this.panelToggle.style.display="block",this.unwrapElements(),this.removeHighlightButtons()}highlightButtonFocus(){document.addEventListener("focusin",(t=>{const e=t.target;if(e.classList.contains("edac-highlight-btn")){const t=e.closest(".edac-highlight");if(t){t.classList.add("active");const i=e.getAttribute("data-issue-id");this.description(i),this.cancelDescriptionTimeout()}}}))}highlightButtonFocusOut(){document.addEventListener("focusout",(t=>{const e=t.target;if(e.classList.contains("edac-highlight-btn")){const t=e.closest(".edac-highlight");if(t){t.classList.remove("active");const e=document.querySelector("#edac-highlight-panel-description");this.descriptionTimeout=setTimeout((function(){e.style.display="none"}),500)}}}))}cancelDescriptionTimeout(){clearTimeout(this.descriptionTimeout)}description(t){const e=document.querySelector(".edac-highlight-panel-description-title"),i=document.querySelector(".edac-highlight-panel-description-content");let n=this.issues[t].summary;this.panelDescription.style.display="block",n+=` <br /><a class="edac-highlight-panel-description-reference" href="${this.issues[t].link}">Full Documentation</a>`,e.innerHTML=this.issues[t].rule_title,i.innerHTML=n}}window.addEventListener("DOMContentLoaded",(()=>{1==edac_script_vars.active&&(new AccessibilityCheckerHighlight,new AccessibilityCheckerDisableHTML)}));