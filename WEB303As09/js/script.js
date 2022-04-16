$(function () {

    var $tbody = $('tbody'); // reference <tbody> element on the page
    var $search = $('#filter-search'); // reference to the search input box
    var cache = [ // Create array of cache
        // example of how the cache gets built
        // {
        //     element: $row0Reference,
        //     fname: "magnus"
        //     lnameFirstCharacter: "c"
        // },
        // {
        //     element: $row1Reference,
        //     text: "ding"
        //     lnameFirstCharacter: "l"
        // }
    ];
    var lastNameCount = [0, 0]; // initially 0 last names starting with a- m and 0 starting with n - z
    var $buttons = $('#buttons'); // Store buttons

    // this method is asynchronous, so anything that depends on this data needs to be build inside 
    // the done method or in a function that is called AFTER the method is done
    $.getJSON("movies.json").done((data) => {
        // jQuery.each of the players in the array
        $.each(data.movies, function (key, val) {
            console.log("data key: ", key, " and data value: ", val);

            var $row = $('<tr></tr>'); // Create their row
            // populate data
            $row.append($('<td></td>').text(val.name));
            $row.append($('<td></td>').text(val.year));
            $row.append($('<td></td>').text(val.director));
            $row.append($('<td></td>').text(val.genre));
            $row.append($('<td></td>').text(val.rating));
            $row.append($('<td></td>').text(val.publishedDate));


            $tbody.append($row); // Add row to the tbody

            cache.push({ // Create the cache that contains several values
                element: $row, // Reference to the row element
                // The text we're searching against (which in this case is first name)
                name: val.name.trim().toLowerCase().charAt(0),
                // we only need the first character of the last name for filtering
                
            });

            // add to the count for last names starting with a - m, and n - z
            if ("a" <= val.name.trim().toLowerCase().charAt(0) && "m" >= val.name.trim().toLowerCase().charAt(0)) {
                name[0]++; // index 0 will be for if the last name starts with a - m
            }
            else { // n - z
                name[1]++; // index 1 will be for if the last name starts with n - z
            }
        });

        // after we process each player, we want to add the buttons to the page.
        // We need to build the buttons after the data comes back from the server
        // otherwise lastNameCount at both indexes will alawys be 0 on the page
        $('<button/>', { // Create button
            text: 'A - M (' + nameFirstCharacter[0] + ')', // Add text, and the count for occurances
            click: function () { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((movie) => { // Each cache entry
                    // check if character is in range
                    if ("a" <= movie.nameFirstCharacter && "m" >= movie.nameFirstCharacter) {
                        movie.element.show();
                    }
                    else { // not in range, hide this chess player
                        movie.element.hide();
                    }
                });

             
            }
        }).appendTo($buttons); // Add to buttons

        $('<button/>', { // Create button
            text: `N - Z (${nameCount[1]})`, // Add text
            click: function () { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((movie) => { // Each cache entry
                    // check if character is in range
                    if ("n" <= movie.nameFirstCharacter && "z" >= movie.nameFirstCharacter) {
                        movie.element.show();
                    }
                    else {
                        movie.element.hide();
                    }
                });
            }
        }).appendTo($buttons); // Add to buttons

    });

    // method operates on the search input, so the keyword this references the input#filter-search element
    function filter() {
        var query = this.value.trim().toLowerCase(); // Get query
        if (query) { // If there’s a query
            cache.forEach(function (movie) { // Each cache entry
                var index = 0; // Set index to 0
                index = movie.fname.indexOf(query); // Is text in there?
                if (index != -1) { // we found the string in their first name
                    movie.element.addClass("found-first-name"); // we will apply colours based on this class
                }
                else { // player first name doesn't have the query string, make sure it's not higlighted
                    movie.element.removeClass("found-first-name")
                }
            });
        }
        else { // if the search is empty, nobody should be highlighted
            $('tbody tr').removeClass("found-first-name");
        }
    }
    // if the search input box supports the input event, we want to use it instead of the keyup event
    if ('oninput' in $search[0]) {
        // Use input event to call filter()
        $search.on('input', filter);
    } else { // Otherwise
        // Use keyup event to call filter()
        $search.on('keyup', filter);
    }



});
$("#search").keyup(function(e){
    
    var rows=$("tbody").find("tr").show();
    $("tbody tr").each(function (td) {
        let value = $(this).children().first().text().toLowerCase();
           console.log(value);
           if(e.target.value === "") {
               $(this).css("background-color", "");
           }
           else if(value.includes(e.target.value.toLowerCase())) {
            $(this).css("background-color", "yellow");
        } else {
            $(this).css("background-color", "");
        }
    }); 
});

