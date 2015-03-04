/**
 * @fileoverview 페이지네이션, 화면에 그려지는 요소들을 관리한다
 * (pug.Pagination 에서 분리)
 * @author 이제인(jein.yi@nhnent.com)
 */
/**
 * @constructor ne.component.Pagination.PaginationView
 * @param {Object} options 옵션 객체
 * @param {Object} $element 루트 엘리먼트
 *
 */
ne.component.Pagination.PaginationView = ne.util.defineClass(/** @lends ne.component.Pagination.PaginationView.prototype */{
    init: function(options, $element) {
        /**
         * 페이지네이션의 루트 엘리먼트
         *
         * @type {jQueryObject}
         * @private
         */
        this._element = $element;
        /**
         * 페이지네이션 지정 옵션
         *
         * @type {Object}
         * @private
         */
        this._options = options;
        /**
         * 컴포넌트에 저장되는 셀렉터
         *
         * @type {Object}
         * @private
         */
        this._elementSelector = {};
        /**
         * 선택된 엘리먼트들을 캐싱해두는 객체
         *
         * @type {Object}
         * @private
         */
        this._cachedElement = {};
        /**
         * 페이지 아이템 리스트
         *
         * @type {Array}
         * @private
         */
        this._pageItemList = [];

        ne.util.extend(options, {
            $pre_endOn: options['$pre_endOn'] || $('a.' + this._wrapPrefix('pre_end'), this._element),
            $preOn: options['$preOn'] || $('a.' + this._wrapPrefix('pre'), this._element),
            $nextOn: options['$nextOn'] || $('a.' + this._wrapPrefix('next'), this._element),
            $lastOn: options['$lastOn'] || $('a.' + this._wrapPrefix('next_end'), this._element),
            $pre_endOff: options['$pre_endOff'] || $('span.' + this._wrapPrefix('pre_end'), this._element),
            $preOff: options['$preOff'] || $('span.' + this._wrapPrefix('pre'), this._element),
            $nextOff: options['$nextOff'] || $('span.' + this._wrapPrefix('next'), this._element),
            $lastOff: options['$lastOff'] || $('span.' + this._wrapPrefix('next_end'), this._element)
        });
        this._element.addClass(this._wrapPrefix('loaded'));
    },
    /**
     * 뷰를 업데이트 한다
     *
     * @param {Object} viewSet 뷰갱신에 대한 값들
     */
    update: function(viewSet) {
        this._addTextNode();
        this._setPageResult(viewSet.lastPage);

        var options = this._options,
            edges = this._getEdge(viewSet),
            leftPageNumber = edges.left,
            rightPageNumber = edges.right;

        viewSet.leftPageNumber = leftPageNumber;
        viewSet.rightPageNumber = rightPageNumber;

        if (options.moveUnit === 'page') {
            viewSet.currentPageIndex = viewSet.page;
            viewSet.lastPageListIndex = viewSet.lastPage;
        }

        this._setFirst(viewSet);
        this._setPrev(viewSet);
        this._setPageNumbers(viewSet);
        this._setNext(viewSet);
        this._setLast(viewSet);
    },
    /**
     * 포함관계를 본다
     *
     * @param {JQueryObject} $find 포함되어있는 체크할 대상
     * @param {JQueryObject} $parent 포함하고 있는지 체크할 대상
     * @returns {boolean}
     */
    isIn: function($find, $parent) {
        if (!$parent) {
            return false;
        }
        return ($find[0] === $parent[0]) ? true : $.contains($parent, $find);
    },
    /**
     * 기준 엘리먼트를 구한다
     *
     * @returns {JQueryObject}
     */
    getBaseElement: function() {
        return this._element;
    },
    /**
     * 기준엘리먼트를 초기화 시킨다
     */
    empty: function(){

        var options = this._options,
            $pre_endOn = options.$pre_endOn,
            $preOn = options.$preOn,
            $nextOn = options.$nextOn,
            $lastOn = options.$lastOn,
            $pre_endOff = options.$pre_endOff,
            $preOff = options.$preOff,
            $nextOff = options.$nextOff,
            $lastOff = options.$lastOff;

        options.$pre_endOn = this._clone($pre_endOn);
        options.$preOn = this._clone($preOn);
        options.$lastOn = this._clone($lastOn);
        options.$nextOn = this._clone($nextOn);
        options.$pre_endOff = this._clone($pre_endOff);
        options.$preOff = this._clone($preOff);
        options.$lastOff = this._clone($lastOff);
        options.$nextOff = this._clone($nextOff);

        this._pageItemList = [];

        this._element.empty();
    },
    /**
     * 페이지 숫자를 담은 엘리먼트 중 원하는 엘리먼트를 찾는다.
     *
     * @param {jQueryObject|HTMLElement} el 목록 중에서 찾을 target 엘리먼트
     * @return {jQueryObject} 있을 경우 해당 엘리먼트 jQuery 객체를 반환하며, 없으면 null을 반환한다.
     */
    getPageElement: function(el) {

        var i,
            length,
            pickedItem;

        for (i = 0, length = this._pageItemList.length; i < length; i++) {
            pickedItem = this._pageItemList[i];
            if (this.isIn(el, pickedItem)) {
                return pickedItem;
            }
        }
        return null;
    },
    /**
     * targetElement 엘리먼트에 eventType 이벤트의 콜백함수로 callback 함수를 등록한다.
     *
     * @param {String} eventType 등록할 이벤트 명
     * @param {Function} callback 해당 이벤트가 발생 시에 호출할 콜백함수
     */
    attachEvent: function(eventType, callback) {

        var targetElement = this._element,
            isSavedElement = ne.util.isString(targetElement) && this._elementSelector[targetElement];

        if (isSavedElement) {
            targetElement = this._getElement(targetElement, true);
        }

        if (targetElement && eventType && callback) {
            $(targetElement).bind(eventType, null, callback);
        }
    },
    /**
     * 루트 엘리먼트객체를 돌려준다.
     *
     * @returns {jQueryObject}
     */
    getElement: function() {

        return this._element;

    },
    /**
     * 클래스명에 Prefix 를 붙힘
     * Prefix는 options.classPrefix를 참조, 붙혀질 때 기존 클래스명의 언더바(_) 문자는 하이픈(-)으로 변환됨
     *
     * @param {String} className
     * @returns {*}
     * @private
     */
    _wrapPrefix: function(className) {
        var classPrefix = this._options['classPrefix'];
        return classPrefix ? classPrefix + className.replace(/_/g, '-') : className;
    },
    /**
     * 페이지표시 마크업 사이사이에 options.insertTextNode를 끼어넣어준다.
     * @private
     */
    _addTextNode: function() {

        var textNode = this._options['insertTextNode'];
        this._element.append(document.createTextNode(textNode));

    },
    /**
     * 엘리먼트 복제, html은 동일하나 jQuery객체상태를 초기화 하여 반환된다.
     * @returns {*}
     * @private
     */
    _clone: function($link) {

        if ($link && $link.length && $link.get(0).cloneNode) {
            return $($link.get(0).cloneNode(true));
        }
        return $link;

    },
    /**
     * 페이지 결과값에 따른, 결과클래스를 입힌다.
     * @param {Number} lastNum
     * @private
     */
    _setPageResult: function(lastNum) {

        if (lastNum === 0) {
            this._element.addClass(this._wrapPrefix('no-result'));
        } else if (lastNum === 1) {
            this._element.addClass(this._wrapPrefix('only-one')).removeClass(this._wrapPrefix('no-result'));
        } else {
            this._element.removeClass(this._wrapPrefix('only-one')).removeClass(this._wrapPrefix('no-result'));
        }

    },
    /**
     * 현재페이지의 양 끝페이지를 구한다
     *
     * @param viewSet
     * @returns {{left: *, right: *}}
     * @private
     */

    _getEdge: function(viewSet) {

        var options = this._options,
            leftPageNumber,
            rightPageNumber,
            left;

        if (options.isCenterAlign) {

            left = Math.floor(options.pagePerPageList / 2);
            leftPageNumber = viewSet.page - left;
            leftPageNumber = Math.max(leftPageNumber, 1);
            rightPageNumber = leftPageNumber + options.pagePerPageList - 1;

            if (rightPageNumber > viewSet.lastPage) {
                leftPageNumber = viewSet.lastPage - options.pagePerPageList + 1;
                leftPageNumber = Math.max(leftPageNumber, 1);
                rightPageNumber = viewSet.lastPage;
            }

        } else {

            leftPageNumber = (viewSet.currentPageIndex - 1) * options.pagePerPageList + 1;
            rightPageNumber = (viewSet.currentPageIndex) * options.pagePerPageList;
            rightPageNumber = Math.min(rightPageNumber, viewSet.lastPage);

        }

        return {
            left: leftPageNumber,
            right: rightPageNumber
        };
    },
    /**
     * 첫번째 페이지인지 여부에 따라 첫번째페이지로 가는 링크를 노출할지 결정한다.
     *
     * @param {Object} viewSet
     * @private
     */
    _setFirst: function(viewSet) {
        var options = this._options;
        if (viewSet.page > 1) {
            if (options.$pre_endOn) {
                this._element.append(options.$pre_endOn);
                this._addTextNode();
            }
        } else {
            if (options.$pre_endOff) {
                this._element.append(options.$pre_endOff);
                this._addTextNode();
            }
        }

    },
    /**
     * 이전페이지가 있는지 여부에 따른 오브젝트 활성화
     *
     * @param {Object} viewSet
     * @private
     *
     */
    _setPrev: function(viewSet) {
        var options = this._options;

        if (viewSet.currentPageIndex > 1) {
            if (options.$preOn) {
                this._element.append(options.$preOn);
                this._addTextNode();
            }
        } else {
            if (options.$preOff) {
                this._element.append(options.$preOff);
                this._addTextNode();
            }
        }
    },
    /**
     * 다음페이지가 있는지 여부에 따른 오브젝트 활성화
     *
     * @param {Obejct} viewSet
     * @private
     */
    _setNext: function(viewSet) {
        var options = this._options;

        if (viewSet.currentPageIndex < viewSet.lastPageListIndex) {
            if (options.$nextOn) {
                this._element.append(options.$nextOn);
                this._addTextNode();
            }
        } else {
            if (options.$nextOff) {
                this._element.append(options.$nextOff);
                this._addTextNode();
            }
        }

    },
    /**
     * 마지막페이지가 있는지 여부에 따른 오브젝트 활성화
     *
     * @param {Object} viewSet
     * @private
     */
    _setLast: function(viewSet) {

        var options = this._options;

        if (viewSet.page < viewSet.lastPage) {
            if (options.$lastOn) {
                this._element.append(options.$lastOn);
                this._addTextNode();
            }
        } else {
            if (options.$lastOff) {
                this._element.append(options.$lastOff);
                this._addTextNode();
            }
        }

    },
    /**
     * 페이지 넘버링을 한다
     *
     * @param {Object} viewSet
     * @private
     */
    _setPageNumbers: function(viewSet) {
        var $pageItem,
            firstPage = viewSet.leftPageNumber,
            lastPage = viewSet.rightPageNumber,
            options = this._options,
            i;

        for (i = firstPage; i <= lastPage; i++) {
            if (i === viewSet.page) {
                $pageItem = $(options.currentPageTemplate.replace('{=page}', i.toString()));
            } else {
                $pageItem = $(options.pageTemplate.replace('{=page}', i.toString()));
                this._pageItemList.push($pageItem);
            }

            if (i === firstPage) {
                $pageItem.addClass(this._wrapPrefix(options['firstItemClassName']));
            }
            if (i === lastPage) {
                $pageItem.addClass(this._wrapPrefix(options['lastItemClassName']));
            }
            this._element.append($pageItem);
            this._addTextNode();
        }
    }
});