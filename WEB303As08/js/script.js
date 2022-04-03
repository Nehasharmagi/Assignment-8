$.ajax({
    url:"movies.json",
    success: function(data) {
       let arr1 = 0;
       let arr2 = 0;
        data.movies.forEach(character => {
            $("table tbody").append(`
            <tr>
                <td class="name">${character.name}</td>
                <td>${character.year}</td>
                <td>${character.director}</td>
                <td>${character.genre}</td>
<td>${character.rating}</td>
            </tr>
            `);
            
            let FirstChar = character.name[0].toLowerCase();
            if (FirstChar.match(/[a-mA-M]/)) {
                arr1++;
            } else {
                arr2++;
            }
        });
        
        $("body").append(`<button id="firstButton"> A - M (${arr1})</button>
        <button id="secondButton"> N - Z (${arr2}) </button>`);
        
        $("#firstButton").click(function(e){
            
            var rows=$("tbody").find("tr").show();
            $("tbody tr").each(function(td) {
                let value = $(this).children().first().text();
                if(!value[0].match(/[a-mA-M]/)) {
                    $(this).hide();
                }
            });
        });
        
        $("#secondButton").click(function(e){
            
            var rows=$("tbody").find("tr").show();
            $("tbody tr").each(function(td) {
                let value = $(this).children().first().text();
                if(value[0].match(/[a-mA-M]/)) {
                    $(this).hide();
                }
            });
        });
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

