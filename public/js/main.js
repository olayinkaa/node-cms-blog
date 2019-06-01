$(document).ready(function(){


    setTimeout(()=>{

        $('.auto-hide').slideUp(1000)

    },5000);


$('#addCategory').click(function(){

    $('#categoryModal').modal('show');
    $('#categoryForm')[0].reset();
})

//----------------------------------------------------------------------------------------
  $('#create-category-button').on('click',function(e){
      e.preventDefault();
      var data = $('#title').val();
      $.ajax({
          url:'/admin/category',
          type:'POST',
          data: {name: data},
          success: function(response){

                $('#categoryForm')[0].reset();
                $('#categoryModal').modal('hide');
                Swal({
                                
                    type: 'success',
                    title: 'category added',
                    text:`${response.title}`,
                    showConfirmButton: false,
                    width: 600,
                    padding: '3em',
                    backdrop: `
                    rgba(0,0,123,0.4)
                    url("/img/login.png")
                    center left
                    no-repeat
                `,
                    background: '#fff url(/img/user.jpg)',
                  
                    timer: 2500
                  });

                var html = `

                       <tr>
                              <th scope="row">${response.title}</th>
                              <td class="d-flex">
                                  <a href="/admin/category/edit/${response.id}" class="btn btn-warning mr-2">Edit</a>
                                  <form action="/admin/category/delete/${response.id}?newMethod=DELETE" method="POST">
                                      <button class="btn btn-danger" type="submit">Delete</button>
                                  </form>
                              </td>
                        </tr>
                          
                             `;

            $('.category-list').append(html);                

                  
          }

          
      })

  });

  
//---------------------------------------------------------------------------------------------------------------

// $(document).on('click','.editbutton',function(){

//             var id = $(this).data('value');
//             $('#categoryModalEdit').modal('show');


//             $.ajax({

//                     url: `/admin/category/edit/${id}`,
//                     type:"POST",
//                     data:{idd:id},
//                     success: function(data){



//                     }


//             })
// })

/////////////////////////////////////////////////////////////////////////////////


})

  //