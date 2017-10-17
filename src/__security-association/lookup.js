export function CNBC_Lookup() {};

(function($) {

CNBC_Lookup._hoverClass = 'hover';
CNBC_Lookup._hiddenClass = 'hidden';
CNBC_Lookup.prototype._defaultText = '';
CNBC_Lookup.prototype._noResultsTxt = 'There are no results for ';

CNBC_Lookup.prototype._inputSelector = 'cnbc_hdqbox'; // default is suggestive elems
CNBC_Lookup.prototype._buttonSelector = 'btn-adv-lookup'; // default is suggestive elems

CNBC_Lookup.prototype._lookupURL = process.env.LOOKUPURL; // need dynamic URLs based on ENV
CNBC_Lookup.prototype._advancedURL = process.env.ADVANCEDURL; // need dynamic URLs based on ENV
CNBC_Lookup.prototype._quoteURL = process.env.QUOTEURL; // need dynamic URLs based on ENV
CNBC_Lookup.prototype._resultPositionSet = false;
CNBC_Lookup.prototype._resetPosition = false;
CNBC_Lookup.prototype._timeoutIDs = [];
CNBC_Lookup.prototype._maxResults = 10;
CNBC_Lookup.prototype._keyword = null;
CNBC_Lookup.prototype._multiSupport = true;
CNBC_Lookup.prototype._isAdvanced = 0;
CNBC_Lookup.prototype._callback = null;
CNBC_Lookup.prototype._context = null;
CNBC_Lookup.prototype._keepPageState = false; // TRUE requires pagestate.1.js

CNBC_Lookup.prototype.init = function(args) {
    var $input = null;
	args = args || {};
	
	this._setCallback(args);
	this._setOverrides(args);

    if (typeof args.initDialog != "undefined" && args.initDialog == true) {
        this._inputSelector = 'inputPRMLookup';
        var d = $('<div id="dlgRPMLookup" style="display: none;"><label>Enter Text to Search: </label><input type="text" name="searchtext" id="' + this._inputSelector + '"  placeholder="Symbol / Company"/><input type="button" id="submitGo" value="Go" /><div class="lookup-results"><table cellspacing="0"><tbody><tr><td>Loading...</td></tr></tbody></table></div></div>');
        d.appendTo('body');
        this.dialog = d.dialog({
            title: 'Symbol Lookup',
            autoOpen: false,
            modal: true,
            closeOnEscape: false,
            beforeClose: function( event, ui ) {
                $(this).find('input').val('');
            }
        });
    }
    $input = $('#' + this._inputSelector);
	if (args.advanced) {
		this._setMultiSupport(false);
		this._initAdvanced($input);
	} else if ($input.attr('type') != 'hidden') {
		this.resetInput();
		this._setMultiSupport(args.multi);
		this._initSuggestiveEvents($input);
		this._initSubmitButton();
	} else {
		this._initAdvancedLinkEvent();
	}
	
	if (!this.pageState) {
		this._initAutoLookup();
	}
	
};

CNBC_Lookup.prototype._setCallback = function(args) {
	if (args.callback) {
		this._callback = args.callback;
		
		if (args.context) {
			this._context = args.context;
		}
	}
};

CNBC_Lookup.prototype._setMultiSupport = function(support) {
	this._multiSupport = (support || support == false) ? support : true;
};

CNBC_Lookup.prototype._setOverrides = function(args) {
	if (args.id) {
		this._inputSelector = args.id;
	}
	if (args.button) {
		this._buttonSelector = args.button;
	}
	if (args.max) {
		this._maxResults = args.max;
	}
	if (args.pagestate) {
		this._keepPageState = args.pagestate;
	}
	if (args.positionReset) {
		this._resetPosition = args.positionReset;
	}
	if (args.defaultText) {
		this._defaultText = args.defaultText;
	}
};

CNBC_Lookup.prototype._initAdvanced = function($input) {
	this._isAdvanced = 1;
	this._initAdvancedEvents($input);
	
	if (this._keepPageState) {
		this.pageState = new CNBC_PageState();
		this.pageState.init({callback:this.updateState, context:this});
	}
};

CNBC_Lookup.prototype._initAutoLookup = function() {
	var val = this.getKeywordInput().val();
	
	if (!CNBC_Common.checkForDefault(val, this._defaultText, 1)) {
		this.setKeyword(val);
		this.initLoadAdvanced();
	}
};

CNBC_Lookup.prototype._initSuggestiveEvents = function($input) {
	var self = this; 
	$input.bind('focus', function() {
		CNBC_Common.focus($(this), self._defaultText);
	}).bind('blur', function() {
		CNBC_Common.blur($(this), self._defaultText, 1);
	}).bind('keyup', function(e){
		e.stopImmediatePropagation();
		
		if(e.keyCode == 13 && $("div.lookup-results tr").hasClass("hover")){	// when hovering on an element and hitting enter
			if (self._callback) {
				self._callback.call(self._context, e);
			} else {
				self.gotoPage(e);
			}
		}
		
		var linkContainer = $('.linkContainer:not(.hide)');
		$(linkContainer).addClass('hide').find(".addLink").click();
		
		self.initLoad(e);
    });

	this._initAutoCloseEvents();
	this._initAdvancedLinkEvent();
};

CNBC_Lookup.prototype._initSubmitButton = function() {
	var self = this;
	this.getButtonSubmit().bind('click', function(e) {
	e.preventDefault();
	var val = self.getKeywordInput().val();
	self.hide();
	if (self._callback) {
		if (!CNBC_Common.checkForDefault(val, self._defaultText, 1)) {
			self._callback.call(self._context, e);
		}
	} else {
		var url = self._advancedURL;

		if (!CNBC_Common.checkForDefault(val, self._defaultText, 1)) {
			url = self._quoteURL + val;
		}
		
		CNBC_Common.gotoPage(url);
	}
	});
};

CNBC_Lookup.prototype._initAdvancedEvents = function($input) {
	var self = this;
	this.getButtonSubmit().bind('click', function() {
		self.initLoadAdvanced();
	});
	$input.bind('focus', function() {
		CNBC_Common.focus($(this), self._defaultText);
	}).bind('blur', function() {
		CNBC_Common.blur($(this), self._defaultText, 1);
	}).bind('keypress', function(e) {
		if (e.keyCode == 13) {
			self.initLoadAdvanced();
		}
	});
};

CNBC_Lookup.prototype._initAdvancedLinkEvent = function() {
	var self = this;
	$('a', this.getAdvanedLink()).bind('click', function() {
		var keyword = self.getSearchTerm().html();
		CNBC_Common.gotoPage(self._advancedURL + keyword);
	});
};

CNBC_Lookup.prototype._initAutoCloseEvents = function() {
	var self = this;
	var $div = this.getResultDiv();
	
	$div.bind('mouseover', function() {
		self.resetAutoClose();
	}).bind('mouseout', function() {
		self.initHide(self);
	}).bind('click', function() {
		self.hide(self);
	});
};

CNBC_Lookup.prototype._initResultEvents = function($container) {
	$container = ($container && $container.length == 1) ? $container : this.getResultDiv();
	var self = this;
	$('tbody tr', $container).bind('click', function(e) {
		if (self._callback) {
			self._callback.call(self._context, e);
		} else {
			self.gotoPage(e);
		}
		var linkContainer = $('.linkContainer:not(.hide)');
		$(linkContainer).addClass('hide').find(".addLink").click();
	}).bind('mouseover mouseout', function(e) {
		self.hover(e);
	});
};

// cached selectors
CNBC_Lookup.prototype.getElContainer = function() {
	if (typeof this._$containerDiv == 'undefined' || this._$containerDiv.length == 0) {
		this._$containerDiv = this.getLookupContainer(this.getKeywordInput());
	}
	
	return this._$containerDiv;
};

CNBC_Lookup.prototype.getLookupContainer = function($el) {
    // @TODO find a better/more reliable way to identify container element
    // and no utilize jQuery UI classes
	var $parent = $el.closest('.ui-widget-content');
	return $parent;
};

CNBC_Lookup.prototype.getResultDiv = function() {
	if (typeof this._$resultDiv == 'undefined' || this._$resultDiv.length == 0) {
		this._$resultDiv = $('div.lookup-results', this.getElContainer());
	}
	
	return this._$resultDiv;
};

CNBC_Lookup.prototype.getResultTable = function() {
	if (typeof this._$resultTable == 'undefined' || this._$resultTable.length == 0) {
		this._$resultTable = $('table', this.getResultDiv());
	}
	
	return this._$resultTable;
};

CNBC_Lookup.prototype.getKeywordInput = function() {
	if (typeof this._$keywordInput == 'undefined' || this._$keywordInput.length == 0) {
		this._$keywordInput = $('#' + this._inputSelector);
	}
	
	return this._$keywordInput;
};

CNBC_Lookup.prototype.getButtonSubmit = function() {
	if (!this._$submitButton) {
		this._$submitButton = $('#' + this._buttonSelector);
	}
	
	return this._$submitButton;
};

CNBC_Lookup.prototype.getSearchTerm = function() {
	if (!this._$searchTerm) {
		this._$searchTerm = $('span.keyword', this.getAdvanedLink());
	}
	
	return this._$searchTerm;
};

// TODO: fix to be generic
CNBC_Lookup.prototype.getAdvanedLink = function() {
	if (typeof this._$advanedLink == 'undefined' || this._$advanedLink.length == 0) {
		this._$advanedLink = $('p.advancedlink', this.getElContainer());
	}
	
	return this._$advanedLink;
};

CNBC_Lookup.prototype.getAdvSearchTerm = function() {
	if (typeof this._$advSearchTerm == 'undefined' || this._$advSearchTerm.length == 0) {
		this._$advSearchTerm = $('#adv-keyword');
	}
	
	return this._$advSearchTerm;
};

CNBC_Lookup.prototype._getRow = function(target) {
    return $(target).closest('tr');
};

CNBC_Lookup.prototype.getSymbol = function(el) {
	var $el = $(el);
	
	if ($el.hasClass('btn') || $el.parent('a.btn').length == 1 || el.tagName == 'INPUT') {
		return this._keyword;
	} else {
		return this._getRow(el).attr('symbol');
	}
};

CNBC_Lookup.prototype.hover = function(e) {
	var $el = this._getRow(e.target);
	
	if ($el.hasClass(CNBC_Lookup._hoverClass)) {
		$el.removeClass(CNBC_Lookup._hoverClass);
	} else {
		var $parent = this.getResultDiv();
		$('tbody tr', $parent).removeClass(CNBC_Lookup._hoverClass);
		$el.addClass(CNBC_Lookup._hoverClass);
	}
};

CNBC_Lookup.prototype.gotoPage = function(e) {
	var sym = this.getSymbol(this._getRow(e.target));
	if (sym && sym != "") {
		CNBC_Common.gotoPage(this._quoteURL + sym);
	}
};

CNBC_Lookup.prototype.getLastSymbol = function() {
	var str = this._keyword;
	
	if (!CNBC_Common.isNull(str)) {
		var strArr = str.split(',');
		
		if (strArr && strArr.length > 1) {
			str = strArr[strArr.length - 1];
		}
	}
	return $.trim(str);
};

CNBC_Lookup.prototype.setKeyword = function(val) {
	this._keyword = val || this.getKeywordInput().val();
};

CNBC_Lookup.prototype.initLoad = function(e) {
	var code = e.keyCode;
	this.setKeyword();
	if (code == 13) { // enter = goto page
		this.hide();
		if (!CNBC_Common.isNull(this._keyword)) {
			if (this._callback) {
				this._callback.call(this._context, e);
			} else {
				CNBC_Common.gotoPage(this._quoteURL + encodeURIComponent(this._keyword));
			}
		}
	} else if (code == 188) { // comma = init multi symbol
		this.hide();
	} else if (code == 38 || code == 40) {
		this.highlightRow(code == 40);
	} else if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 187 && code <= 192) || code == 8 || code == 46 || code == 222) {
		
		var sym = this.getLastSymbol();
		if (CNBC_Common.isNull(sym)) {
			this.hide();
		} else {
			this.load(sym);
		}
	}
};

CNBC_Lookup.prototype.initLoadAdvanced = function() {
	this._lastPage = 1;
	this._paging = null; // reset paging
	this.loadAdvanced(1);
};

CNBC_Lookup.prototype.loadAdvanced = function(page) {
	this._currentPage = Number(page);
	var val = this.getKeywordInput().val();
	this.load(val);
	
	if (this.pageState) {
		this.pageState.setHash(val + '-' + page);
	}
};

CNBC_Lookup.prototype.load = function(keyword) {
	var self = this;
	if (keyword && keyword != "" && keyword != this._defaultText) {
		var args = self.setLoadArgs(keyword);
	
		$.ajax({
			url: self._lookupURL
			,type: 'get'
			,dataType: 'jsonp'
			,data: args
			,success: function(json){self.update(json);}
			,error: null
		});
	}
};

CNBC_Lookup.prototype.setLoadArgs = function(keyword) {
	var args = {
		output: 'jsonp'
		,prefix: keyword
	};
	
	if (this._isAdvanced) {
		args.pgok = 1;
		args.pgsize = this._perPage;
		args.pg = this._currentPage;
	} else {
		args.maxresults = this._maxResults;
	}
	
	return args;
};

CNBC_Lookup.prototype.position = function($el) {
	if (!this._resultPositionSet) {
		var $input = this.getKeywordInput();
		var $div = $el || this.getResultDiv();
		
		var height = $input.height();
		var offset = $input.offset();
		var position = $input.position();
		
		$div.css({
			top: offset.top + (height + 4)
			,left: position.left
		});
		
		if (!this._resetPosition) {
			this._resultPositionSet = true; // only set position once
		}
	}
};

CNBC_Lookup.prototype.resetAutoClose = function() {
	for (var i=0, len=this._timeoutIDs.length; i<len; ++i) {
		clearTimeout(this._timeoutIDs[i]);
	}

	this._timeoutIDs = [];
};

CNBC_Lookup.prototype.initHide = function(self) {
	self = self || this;

	var id = setTimeout(function() {self.hide(self);}, 2000);
	this._timeoutIDs.push(id);
};

CNBC_Lookup.prototype.hide = function(self) {
	self = self || this;
	self.getResultTable().empty();
	self.getResultDiv().addClass('hide');
};

CNBC_Lookup.prototype.show = function($div) {
	this.resetAutoClose();
	
	var $div = $div || this.getResultDiv();
	$div.removeClass('hide');
};

CNBC_Lookup.prototype.resetInput = function() {
	this.getKeywordInput().val(this._defaultText).blur();
};

CNBC_Lookup.prototype.setTotals = function(obj) {
	this._totals = obj;
};

CNBC_Lookup.prototype.update = function(result) {
	if (this._isAdvanced) {
		this.updateAdvanced(result);
	} else{
		this.updateSuggestive(result);
	}
	this.setSearchTerm();
};

CNBC_Lookup.prototype.highlightTerm = function(str) {
	if (str != "" && typeof str === 'string') {
		try {
			var strMatch = (this._isAdvanced) ? this.getKeywordInput().val() : this.getLastSymbol();
			var regex = new RegExp(strMatch, "i");
			return str.replace(regex, '<span class="hlight">$&</span>');
		} catch(e) {}
	}

	return str;
};

CNBC_Lookup.prototype.updateSuggestive = function(result) {	
	if (result && result.length > 1) {
		var $div = this.getResultDiv();
		this.position($div);
		this.getResultTable().empty().append(this.renderTableData(result, true));
		this.show();
		this._initResultEvents();
	} else {
		this.hide();
	}
};

CNBC_Lookup.prototype.highlightRow = function(desc) {
	var $rows = $('tr', this.getResultTable());
	var $selected = $rows.filter('.' + CNBC_Lookup._hoverClass);
	var $nextSelect = $rows.first();
	
	var isHighlighted = ($selected.length == 1) ? true : false;
	
	if ($rows.length > 0) {
		if (isHighlighted) {
			if (desc) {
				$nextSelect = $selected.next();
				if ($nextSelect.length == 0) {
					$nextSelect = $rows.first();
				}
			} else {
				$nextSelect = $selected.prev();
				if ($nextSelect.length == 0) {
					$nextSelect = $rows.last();
				}
			}
		}
	
		$rows.removeClass(CNBC_Lookup._hoverClass);
		$nextSelect.addClass(CNBC_Lookup._hoverClass);
		
		this.updateSearchTerm($nextSelect.attr('symbol')|| $nextSelect.data('symbolInfo').symbolName);
	}
};

CNBC_Lookup.prototype.updateSearchTerm = function(str) {
	this.getKeywordInput().val(str);
	this.setKeyword();
};

CNBC_Lookup.prototype.setSearchTerm = function() {
	var $el, keyword = this._keyword;
	if (this._isAdvanced) {
		$el = this.getAdvSearchTerm();
		keyword = this.getKeywordInput().val();
		$el.parent().removeClass('hide');
	} else {
		$el = this.getSearchTerm();
	}
	
	$el.html(escape(keyword));
};

CNBC_Lookup.prototype.updateAdvanced = function(result) {
	var $div = this.getResultDiv();
	this.setTotals(result[0]);

	if (result && result.length > 1) {
		if (CNBC_Common.isNull(this._paging)) {
			this.renderTable($div, result);
		} else {
			this.updateTable($div, result);
			this._initResultEvents();
		}
 	} else {
		$div.html(this.renderNoResults(this.getKeywordInput().val()));
	}
};

CNBC_Lookup.prototype.renderTable = function($el, data) {
    // @TODO refactor to construct DOM instead, 
    // update call to renderTableData with optional parameter true
	var html = ['<table cellspacing="0">'];
	html.push('<thead>');
		html.push('<tr>');
			html.push('<th>Symbol</th>');
			html.push('<th>Name</th>');
			html.push('<th>Exchange</th>');
			html.push('<th>Country</th>');
		html.push('</tr>');
	html.push('</thead>');
	html.push(this.renderTableData(data));
	html.push('</table>');
	
	$el.html(html.join(''));
	
	this._initResultEvents($el);
	this.initPagination($el);
};

CNBC_Lookup.prototype.updateTable = function($el, data) {
	this._paging.updatePaging(this._totals.CurrentPage);
	
	var $table = $('table', $el);
	$('tbody', $table).remove();
	$table.append(this.renderTableData(data, true));
};

CNBC_Lookup.prototype.initPagination = function($el) {
	this._paging = new CNBC_Pagination();
	var args = {
		container: $el
		,context: this
		,callback: this.loadAdvanced
		,total: this._totals.TotalMatchAvailable
		,start: this._currentPage
	};
	
	this._paging.init(args);
};

CNBC_Lookup.prototype.renderTableData = function(result, returnDom) {
    // @TODO remove array push code
    // update references to append DOM instead of plain text
    if (typeof returnDom != "undefined" && returnDom == true) {
        var 
            $row,
            $table = $('<table>');

        for (var i=1, len=result.length; i<len; ++i) {
            result[i];
            $row = $('<tr>');
            $row.data('symbolInfo', result[i]);
            $row.append('<td class="col-symbol">' + this.highlightTerm(result[i].symbolName) + '</td>');
            $row.append('<td>' + this.highlightTerm(result[i].companyName) + '</td>');
            if (this._isAdvanced) { 
                $row.append('<td>Issue Type</td>');
            }
            $row.append('<td class="last">' + CNBC_Common.validateStr(result[i].countryCode) + '</td>');
            $row.appendTo($table);
        }
        return $table;
        
    } else {
        var html = ['<tbody>'];
        
        var obj, sym, country;
        for (var i=1, len=result.length; i<len; ++i) {
            obj = result[i];
            sym = obj.symbolName;
            country = obj.countryCode;
            html.push('<tr symbol="' + sym + '">');
                html.push('<td class="col-symbol">');
                    html.push(this.highlightTerm(sym));
                html.push('</td>');
                html.push('<td>');
                    html.push(this.highlightTerm(obj.companyName));
                html.push('</td>');
                if (this._isAdvanced) { html.push('<td>Issue Type</td>'); }
                html.push('<td class="last">');
                    html.push(CNBC_Common.validateStr(country));
                html.push('</td>');
            html.push('</tr>');
        }
        
        html.push('</tbody>');

        return html.join('');
    }
};

CNBC_Lookup.prototype.renderNoResults = function(str) {
	return '<div class="error">' + this._noResultsTxt + '"' + escape(str) + '"</div>';
};

CNBC_Lookup.prototype.updateState = function() {
	var hash = String(this.pageState.getHash()).split('-');
	this.getKeywordInput().val(hash[0]);
	if (hash.length > 1) {
		this.loadAdvanced(hash[1]);
	}
};

})(jQuery);