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
<td>${character.publishedDate}</td>
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

var compare = { 
            name: function(a, b) { 
                if (a < b) 
                { 
                    return -1; 
                } else 
                { 
                    return a > b ? 1 : 0;
                }
            }, 
            publishedDate: function(a, b) { 
                a = new Date(a);
                b = new Date(b);
                return a - b;
            }
        }
            var $table = $('.sortable'); 
            var $tbody = $table.find('tbody'); 
            var $controls = $table.find('th'); 
            var rows = $tbody.find('tr').toArray();
            var originalRows = $tbody.find('tr').toArray(); 

            $controls.on('click', function() 
            { 
                var $header = $(this); 
                var order = $header.data('sort'); 
                var column; 

                if ($header.is('.ascending') || $header.is('.descending') || $header.is('.original'))
                {               
                    if ($header.is('.ascending')) {
                        $header.removeClass('ascending');
                        $header.addClass('descending');
                        $tbody.append(rows.reverse());
                      } 

                      else if ($header.is('.descending')) {
                        $header.removeClass('descending');
                        $header.addClass('original');
                        $tbody.append(originalRows);
                      } 
                      else {
                        $header.removeClass('original');
                        $header.addClass('ascending');
                        $tbody.append(rows.reverse());
                      }
                }
                else {
                    $header.addClass('ascending'); 
                    $header.siblings().removeClass('ascending descending original');

                    if (compare.hasOwnProperty(order)) 
                    {
                        column = $controls.index(this);
                        rows.sort(function(a, b) { 
                            a = $(a).find('td').eq(column).text();
                            b = $(b).find('td').eq(column).text();
                            return compare[order](a, b); 
                        });
                        $tbody.append(rows);
                    }
                } 
            });
    

