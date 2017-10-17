// import {DOMSerializer, Schema} from 'prosemirror-model'
// import {EditorView} from 'prosemirror-view'
// import {State} from 'prosemirror-state'
//
// export function contentHandler(state, dispatch) {
//
//   if (! dispatch) return false
//
//   // private serializer: DOMSerializer
//   // private view: EditorView
//
//   // constructor(view: EditorView) {
//     // this.serializer = DOMSerializer.fromSchema(schema)
//     // this.view = view
//   // }
//
//   // public serialize(fragment: DocumentFragment) {
//   //   return this.serializer.serializeFragment(fragment)
//   // }
//
//   // public saveRTEContent() {
//
//   // let selElmWrapper = selector.substring(1)
//   // let selElm = selElmWrapper.replace('-wrapper', '')
//   let groupQualifiers = ['h2', 'assets', 'pullquote', 'group_assets', 'wildcard']
//   // in case of slideshow, define unique elements for group
//   // if (node_data && node_data.type == 'SlideShow') {
//   //   // list of elements that should not grouped together
//   //   let groupUniqueElements = ['assets', 'group_assets', 'wildcard']
//   // }
//   // let bodyContent = $('iframe', selector).contents().find('body').html()
//   // let bodyContent = tinymce.get(selElm).getContent({format:'html'})
//   // let assetInline = []
//   // let pcGroupNumber = false, pc = ''
//
//   // body = $('<div>' + bodyContent + '</div>')
//   let body = state.doc.content
//   // $(body).find('.mce-offscreen-selection').remove()	// Remove the mce-bogus element
//   // $(body).find('.asset-wrapper').remove()				// Remove the asset-wrapper added from redesign
//   // let inlineChartContObj = $(body).find('.inline_chart_container')
//   // inlineChartContObj.removeAttr('contenteditable') // Remove contenteditable attribute added in RTE
//   // inlineChartContObj.removeClass('inline_chart_container') // Remove the class added in RTE
//   // $(body).find('.close_inline_chart_icon').remove() // Remove close icon added in RTE
//
//   // Remove g tag from the body content, leaving behind the inner content of g tag
//   // $('*', body).each(function (i, item) {
//   //   $('g', item).each(function (j, g_ele) {
//   //     let helper = $('<b>helper</b>')
//   //     $(g_ele).before(helper)
//   //
//   //     helper.after($(g_ele).contents())
//   //     helper.remove()
//   //
//   //     $(g_ele).remove()
//   //   })
//   // })
//
//   // Remove br added for new line
//   // $('br.br_for_newline', body).each(function(i, item) {
//   //   let parent_item = $(item).parent()
//   //   $(item).remove()
//   //   if (!parent_item.text()) {
//   //     // if parent container is empty
//   //     // remove it
//   //     parent_item.remove()
//   //   }
//   // })
//
//   // remove data-mce-bogus attribute
//   // $('br[data-mce-bogus]', body).removeAttr('data-mce-bogus')
//
//   // remove bogus elements added by tinymce
//   // $('div[data-mce-bogus], p[data-mce-bogus]', body).remove()
//
//   // remove last p if empty
//   // let last_p = $('p', body).last()
//   // if (last_p.length && !last_p.text()) {
//   //   last_p.remove()
//   // }
//
//   // $('a', body).each(function(i, item) {
//   //   if ($.trim($(item).text()) == '') {
//   //     // remove empty anchor tags
//   //     $(item).remove()
//   //     return
//   //   }
//   //   link = $(item).attr('href')
//   //   readMore = $(item).attr('label') || null
//   //   //Convert into asset_inline only if its a valid nid
//   //   if (!isNaN(parseInt(link)) || link) {
//   //     assetInline.push('<asset_inline')
//   //     if (!isNaN(parseInt(link))) {
//   //       assetInline.push(' nid='' + link + ''')
//   //     } else {
//   //       extTitle = $(item).attr('title')
//   //       assetInline.push(' ext_link='' + link + ''')
//   //       assetInline.push(' ext_title='' + extTitle + ''')
//   //     }
//   //     if (readMore && readMore != null) {
//   //       assetInline.push(' label='' + readMore + ''')
//   //     }
//   //     assetInline.push('>')
//   //     assetInline.push($(item).html())
//   //     assetInline.push('</asset_inline>')
//   //     $(item).replaceWith(assetInline.join(''))
//   //     assetInline = []
//   //   }
//   // })
//
//   // let parsedbodyContent = $.parseHTML(body.html())
//   let parsedbodyContent = body.children
//   let content = '<group>'
//   let prevElement = ''
//   let groupElements = []
//   let pullquoteInGroup = false
//   let divOpened = false
//
//   let totaldata = []
//
//   if (parsedbodyContent && parsedbodyContent.length) {
//   // process differently in case of slideshpws
//   // if (node_data && node_data.type == 'SlideShow') {
//   //   $.each(parsedbodyContent, function(i, el) {
//   //     if (el.nodeName.toLowerCase() != '#text') {
//   //       if (el.nodeName.toLowerCase() == 'h2') {
//   //         // if prevElement is not null, then close the current group and start new group
//   //         if (prevElement !== '') {
//   //           if (divOpened) {
//   //             content += '</div>'
//   //             divOpened = false
//   //           }
//   //           content += '</group><group>'
//   //           groupElements = []
//   //           pullquoteInGroup = false
//   //         }
//   //         // add h2 to new group
//   //         content += '<'+ el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//   //       } else if ($.inArray(el.nodeName.toLowerCase(), groupUniqueElements) !== -1) {
//   //         // check if it is one of groupUniqueElements
//   //         // check if any one of these groupUniqueElements is already there
//   //         // just check the count of groupElements
//   //         if (groupElements.length || pullquoteInGroup) {
//   //           // close the current group and start new group
//   //           if (divOpened) {
//   //             content += '</div>'
//   //             divOpened = false
//   //           }
//   //           content += '</group><group>'
//   //           groupElements = []
//   //           pullquoteInGroup = false
//   //         } else if (prevElement !== '' && $.inArray(prevElement.toLowerCase(), groupQualifiers) == -1) {
//   //           // if previous element is not a group qualifier
//   //           // close the current group and start new group
//   //           if (divOpened) {
//   //             content += '</div>'
//   //             divOpened = false
//   //           }
//   //           content += '</group><group>'
//   //           groupElements = []
//   //           pullquoteInGroup = false
//   //         }
//   //         groupElements.push(el.nodeName)
//   //         // add to group
//   //         content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//   //       } else if (el.nodeName.toLowerCase() == 'pullquote') {
//   //         // pullquote
//   //         // check if pullquote is already there
//   //         if (pullquoteInGroup) {
//   //           // close the current group and start new group
//   //           if (divOpened) {
//   //             content += '</div>'
//   //             divOpened = false
//   //           }
//   //           content += '</group><group>'
//   //           groupElements = []
//   //         } else if (prevElement !== '' && $.inArray(prevElement.toLowerCase(), groupQualifiers) == -1) {
//   //           // if previous element is not a group qualifier
//   //           // close the current div
//   //           if (divOpened) {
//   //             content += '</div>'
//   //             divOpened = false
//   //           }
//   //         }
//   //         // set flag to true which indicates the pullquote is already in the group
//   //         pullquoteInGroup = true
//   //         // add to group
//   //         content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//   //       } else {
//   //         // if prevElement is null or one of groupQualifiers, open new div
//   //         if (prevElement == '' || $.inArray(prevElement.toLowerCase(), groupQualifiers) !== -1) {
//   //           if (!divOpened) {
//   //             content += '<div class='group'>'
//   //             divOpened = true
//   //           }
//   //         }
//   //         // add it to current group
//   //         content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//   //       }
//   //       prevElement = el.nodeName
//   //     }
//   //   })
//   // } else {
//     // this flag is not required in this case
//     // set it to true by default
//     divOpened = true
//     for (let x = 0; x >= parsedbodyContent.length ; x++) {
//       let el = parsedbodyContent[x]
//       // $.each(parsedbodyContent, (i, el) => {
//       if (el.nodeName.toLowerCase() !== '#text') {
//         if (groupQualifiers.includes(el.nodeName.toLowerCase())) {
//           if (prevElement !== '' && prevElement.toLowerCase() !== 'promocutoff')
//             content += '</div></group><group>'
//
//           content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML
//           content += '</' + el.nodeName.toLowerCase() + '><div class="group">'
//
//         } else if (el.nodeName.toLowerCase() === 'promocutoff') {
//           // add this node to the  current group and close it
//           if (prevElement !== '')
//             content += '</div>'
//
//           content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//           content += '</group><group>'
//         } else {
//           if (prevElement === '' || prevElement.toLowerCase() === 'promocutoff')
//             content += '<div class="group">'
//
//           content += '<' + el.nodeName.toLowerCase() + '>' + el.innerHTML + '</' + el.nodeName.toLowerCase() + '>'
//         }
//         prevElement = el.nodeName
//       }
//     }
//     // })
//
//     if (divOpened) content += '</div>'
//
//     content += '</group>'
//
//     /*
//     $.each($(content), function (i, cnt) {
//       let totalbody = new Object()
//       let comp = []
//       let comp_autoplay = new Object()
//       let group_asset = $('group_assets', cnt).length > 0
//       let wildcard_obj = new Object()
//
//       promo_cut_off = new Object()
//       if ($('promocutoff', cnt).length > 0) {
//         pcGroupNumber = i + 1
//         $('.group', cnt).find('promocutoff').remove()
//       }
//
//       totalbody.body = $('.group', cnt).html() || ''
//       totalbody.subtitle = $('h2', cnt).text() || ''
//       $('assets', cnt).each(function (i, asset) {
//         let nid = $('asset', this).attr('nid') || ''
//         let autoplay = $('asset', this).attr('autoplay_flag')
//         comp.push(nid)
//         if (nid && $('asset', this).attr('asset_type_name') == 'cnbcvideo') {
//           comp_autoplay[nid] = autoplay
//         }
//       })
//       let pull_quote_obj = $('pullquote', cnt)
//       pQuote = new Object()
//       if (pull_quote_obj.length > 0) {
//         pQuote.pullQuoteQuote = $('.quote_text', pull_quote_obj).text()
//         pQuote.pullQuoteAttr = $('.quote_author', pull_quote_obj).text()
//         pQuote.pullQuoteTitle = $('.quote_title', pull_quote_obj).text()
//       } else {
//         pQuote.pullQuoteQuote = pQuote.pullQuoteAttr = pQuote.pullQuoteTitle = ''
//       }
//       totalbody.pullQuote = pQuote
//
//       if (pcGroupNumber) {
//         promo_cut_off.pos_num = pcGroupNumber
//         promo_cut_off.promo = pc
//         totalbody.promo_cutoff = promo_cut_off
//       }
//
//       // wildcard processing
//       wildcard = $('wildcard', cnt)
//       if (wildcard.length > 0 && $('span.embed_code', wildcard).text()) {
//         wildcard_obj.slug = $('#edit-slug').val()
//         wildcard_obj.text = $('span.embed_code', wildcard).text()
//         totalbody.wildcard = wildcard_obj
//       }
//
//       totalbody.components = comp
//       totalbody.components_autoplay = comp_autoplay
//       totalbody.group_asset = group_asset
//       totaldata.push(totalbody)
//     })
//
//     let json_data = JSON.stringify(totaldata)
//     $(selector).html(escape(json_data))
//     $(selector + '-escaped').val(json_data)
//     if (selector == '#edit-body-wrapper') {
//       // capture the first image on RTE
//       // this will be promoted if no image is promoted by the user
//       $('#edit-first-image-on-rte').val($(tinymce.get('edit-body')
//       .getDoc()).find('asset[asset_type='36']:first').attr('nid'))
//     }
//     */
//
//     return true
//
//   }
//
// }
