//http://localhost:1661/#?Municipality=Calgary,Edmonton&Sector=Oil&Stage=Something&BudgetMin=310&BudgetMax=600&ShowRecent

function ApplyRouting(magicControls, projectMap) {
    function FilterItemsInMagicDropDown(items, source) {
        var itemTextList = $.map(source.getData(), function (item) { return item.name; });
        return $.grep(items, function (item) {
            return $.inArray(item, itemTextList) == 0;
        });
    }
    
    var app = $.sammy(function () {
        this.get(/\#?(municipality=[\w,]+)?(sector=[\w,]+)?(stage=[\w,]+)?(budgetmin=[\w,]+)?(budgetmax=[\w,]+)?(showrecent=1)?/, function (context) {
            var $this = this;
            var params = this.params.toHash();
            delete params.splat;

            if (this.params.municipality) {
                magicControls.municipality.setValue(FilterItemsInMagicDropDown(this.params.municipality.split(","), magicControls.municipality));
            }
            if (this.params.sector) {
                magicControls.sector.setValue(FilterItemsInMagicDropDown(this.params.sector.split(","), magicControls.sector));
            }
            if (this.params.stage) {
                magicControls.stage.setValue(FilterItemsInMagicDropDown(this.params.stage.split(","), magicControls.stage));
            }
            if (this.params.budgetmin) {
                $("#project-budget-slider-control").slider("values", 0, Number(this.params.budgetmin));
                slider_onSlide();
                $("#project-budget-min").change();
            }
            if (this.params.budgetmax) {
                $("#project-budget-slider-control").slider("values", 1, Number(this.params.budgetmax));
                slider_onSlide();
                $("#project-budget-min").change();
            }
            if (this.params.showrecent && this.params.showrecent == "1") {
                $("#project-recently-added").prop("checked", true);
            }

            $(magicControls.municipality).on('selectionchange', function () {
                params.municipality = this.getValue();
                $this.redirect('/#', params);
            });

            $(magicControls.sector).on('selectionchange', function () {
                params.sector = this.getValue();
                $this.redirect('/#', params);
            });

            $(magicControls.stage).on('selectionchange', function () {
                params.stage = this.getValue();
                $this.redirect('/#', params);
            });

            $("#project-recently-added").change(function () {
                var $box = $(this);
                if ($box.is(":checked")) {
                    params.showrecent = 1
                } else {
                    delete params.showrecent;
                }

                $this.redirect('/#', params);
            });

            $("#project-budget-slider-control").on("slidechange", function () {
                params.budgetmin = $("#project-budget-slider-control").slider("values", 0);
                params.budgetmax = $("#project-budget-slider-control").slider("values", 1);
                $this.redirect('/#', params);
            });

            $(window).trigger("resize");
        });
    });

    app.run('#/');


}