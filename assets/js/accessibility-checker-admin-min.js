!function(e){"use strict";e((function(){e("input[type=checkbox][name=edac_add_footer_accessibility_statement]").on("change",(function(){this.checked?e("input[type=checkbox][name=edac_include_accessibility_statement_link]").prop("disabled",!1):(e("input[type=checkbox][name=edac_include_accessibility_statement_link]").prop("disabled",!0),e("input[type=checkbox][name=edac_include_accessibility_statement_link]").prop("checked",!1))})),"none"==e("input[type=radio][name=edac_simplified_summary_position]:checked").val()&&e("#ac-simplified-summary-option-code").show(),e("input[type=radio][name=edac_simplified_summary_position]").on("load",(function(){"none"==this.value?e("#ac-simplified-summary-option-code").show():e("#ac-simplified-summary-option-code").hide()}))})),e(window).on("load",(function(){function a(){var a=ac_script_vars.postID;null!=a&&jQuery.post(ajaxurl,{action:"edac_summary_ajax",post_id:a},(function(a){var t=a;t=JSON.parse(t),e(".edac-summary").html(t)}))}function t(){var a=ac_script_vars.postID;null!=a&&jQuery.post(ajaxurl,{action:"edac_details_ajax",post_id:a},(function(a){var t=a;t=JSON.parse(t),e(".edac-details").html(t),e(".edac-details-rule-title").click((function(a){e(this).hasClass("active")?(e(this).next().slideUp(),e(this).removeClass("active")):(e(this).next().slideDown(),e(this).addClass("active"))})),e(".edac-details-rule-title-arrow").click((function(e){e.preventDefault()})),e(".edac-details-rule-records-record-actions-ignore").click((function(a){a.preventDefault(),e(this).parent().next(".edac-details-rule-records-record-ignore").slideToggle()})),s()}))}function i(){var t=ac_script_vars.postID;null!=t&&jQuery.post(ajaxurl,{action:"edac_readability_ajax",post_id:t},(function(c){var r=c;r=JSON.parse(r),e(".edac-readability").html(r),e(".edac-readability-simplified-summary").submit((function(c){c.preventDefault();var r=e("#edac-readability-text").val();jQuery.post(ajaxurl,{action:"edac_update_simplified_summary",post_id:t,summary:r},(function(e){var t=e;t=JSON.parse(t),i(),a()}))}))}))}if(e(".edac-tab").click((function(a){a.preventDefault();var t=e("a",this).attr("href");e(".edac-panel").hide(),e(".edac-panel").removeClass("active"),e(".edac-tab a").removeClass("active"),e(t).show(),e(t).addClass("active"),e("a",this).addClass("active")})),e(".edac-tab-summary").click((function(e){a()})),document.body.classList.contains("block-editor-page")){var c=wp.data.select("core/edit-post"),r=!1;wp.data.subscribe((function(){var s=c.isSavingMetaBoxes();s&&e(".edac-panel").addClass("edac-panel-loading"),s===r||s||(r=s,a(),t(),i(),e(".edac-panel").removeClass("edac-panel-loading")),r=s}))}function s(){e(".edac-details-rule-records-record-ignore-submit").click((function(a){a.preventDefault();var t=e(this).attr("data-id"),i=e(this).attr("data-action"),c=e(this).attr("data-type"),r=e(".edac-details-rule-records-record-ignore-comment",e(this).parent()).val();jQuery.post(ajaxurl,{action:"edac_insert_ignore_data",id:t,comment:r,ignore_action:i,ignore_type:c},(function(a){var i=a,c="#edac-details-rule-records-record-"+(i=JSON.parse(i)).id,r="enable"==i.action?"disable":"enable",s="enable"==i.action,d="enable"==i.action?"Ignored":"Ignore",o="enable"==i.action?"Stop Ignoring":"Ignore This "+i.type,n=i.user?"<strong>Username:</strong> "+i.user:"",l=i.date?"<strong>Date:</strong> "+i.date:"";e(c+" .edac-details-rule-records-record-ignore-submit").attr("data-action",r),e(c+" .edac-details-rule-records-record-ignore-comment").attr("disabled",s),"enable"!=i.action&&e(c+" .edac-details-rule-records-record-ignore-comment").val(""),e(c+" .edac-details-rule-records-record-actions-ignore").toggleClass("active"),e(".edac-details-rule-records-record-actions-ignore[data-id='"+t+"']").toggleClass("active"),e(c+" .edac-details-rule-records-record-actions-ignore-label").html(d),e(".edac-details-rule-records-record-actions-ignore[data-id='"+t+"'] .edac-details-rule-records-record-actions-ignore-label").html(d),e(c+" .edac-details-rule-records-record-ignore-submit-label").html(o),e(c+" .edac-details-rule-records-record-ignore-info-user").html(n),e(c+" .edac-details-rule-records-record-ignore-info-date").html(l);var u=e(c).parents(".edac-details-rule"),p=parseInt(e(".edac-details-rule-count",u).html());"enable"==i.action?p--:"disable"==i.action&&p++,0==p?e(".edac-details-rule-count",u).removeClass("active"):e(".edac-details-rule-count",u).addClass("active"),p.toString(),e(".edac-details-rule-count",u).html(p),(e("body").hasClass("accessibility-checker_page_accessibility_checker_issues")||e("body").hasClass("accessibility-checker_page_accessibility_checker_ignored"))&&location.reload(!0)}))}))}a(),t(),i(),s()}))}(jQuery);