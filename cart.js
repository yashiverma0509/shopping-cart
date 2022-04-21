<form action="/cart/" enctype="multipart/form-data" method="post" class="BuyForm">
    <fieldset>
        <input type="hidden" name="products[0395][product_id]" value="29" class="HiddenInput">
        <div class="FormItem BuyFormQuantity">
            <label for="BuyFormQuantity-0395">Quantity:</label>
            <input type="number" id="BuyFormQuantity-0395" name="products[0395][quantity]" size="3" min="0" value="1">
        </div>
        <div class="FormItem FormSubmit">
            <button type="submit" class="SubmitButton AddToCart"><span>Add to cart</span></button>
        </div>
    </fieldset>
</form>

//functionality to products

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
    	if (o[this.name]) {
    		if (!o[this.name].push) {
    			o[this.name] = [o[this.name]];
    		}
    		o[this.name].push(this.value || '');
    	} else {
    		o[this.name] = this.value || '';
    	}
    });
    return o;
};

/*
* Adding is performed by clicking
* the submit button on the purchase form.
*/
$(".BuyForm .AddToCart").on("click", function(event) {
	event.preventDefault();

	/*
	* The purchase form is saved
	*/
	var $form = $(this).closest(".BuyForm");

	/*
	* A POST request is sent
	*/
	$.ajax({
		type: "POST",
		url: "/cart",

		/*
		* The serializeObject function is used to format the data on the server
		* into processable form.
		*/
		data: $form.serializeObject(),
		success: function() {

			/*
			* Finally, the shopping cart is updated after the product has been added.
			*/
			$.ajax({
				type: "GET",
				url: "/interface/MiniCart",
				success: function(data) {
					$(".MiniCartContainer").html(data);
				}
			});
		}
	});
});
