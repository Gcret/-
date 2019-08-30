 $(function(){

        var lists=[];
        if(localStorage.getItem('key')){
            lists=JSON.parse(localStorage.getItem('key'))
        }else{
            lists=[]
        }
    

    //调用
    addList();
    show();
    find();
    delet();
    alter();
    //录入
    function addList(){
        $('.addList').click(function(){
            let username=$('#username').val();
            let password=$('#password').val();
            let sex=$('#sex input[type="radio"]:checked').val();
            let work=$("#work").val();
            let obj={
                username:username,
                password:password,
                sex:sex,
                work:work
            }
            lists.push(obj)
            localStorage.setItem('key',JSON.stringify(lists))
            alert('添加成功')
            location.reload()
        })	
    }
    //展示
            function show(){
                if(lists.length>0){
                    lists.map(function(item,i){
                        $('#nums').append(`
                            <tr>
                                <td>${i}</td>
                                <td>${item.username}</td>
                                <td><button class="btn btn-primary find" name=${i}>查看</td>
                                <td><button class="btn btn-danger delet" name=${i}>删除</td>
                                <td><button class="btn btn-warning alter" name=${i}>修改</td>
                            </tr>
                        `)
                    })
                    
                }else{
                    $('#nums').html('暂时没有人员信息')
                }
            }
    //查询
        //模态框
                    function motaikuang(data){
                        $('#motaikuang').html(`
                        <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">信息</h4>
                                </div>
                                <div class="modal-body">
                                    <p>用户名：${data.username}</p>
                                    <p>密码：${data.password}</p>
                                    <p>性别：${data.sex}</p>
                                    <p>职位：${data.work}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        `)
                        $('#myModal').modal('show')
                    }	

                function find(){
                    $('.find').click(function(){
                        let index = $(this).attr('name');
                        let data=lists[index];
                        motaikuang(data)
                    })
                }
    //修改

    function alter(){
		$('.alter').click(function(){
			let index=$(this).attr('name');
			let data=lists[index]
			$('#motaikuang').html(`
			<div class="modal fade" tabindex="-1" role="dialog" id="myModal1">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">信息</h4>
					</div>
					<div class="modal-body">
						
									<div class="form-group">
							<label for="exampleInputEmail1">用户名</label>
							<input type="text" class="form-control" id="username1" placeholder="${data.username}">
							</div>

							<div class="form-group">
								<label for="exampleInputEmail1">密码</label>
								<input type="text" class="form-control" id="password1" placeholder="${data.password}">
							</div>

							<div class="form-group" id='sex1'>
									<label for="sex">性别</label>
									<div class='form-control'>
										男：<input type="radio" name="sex" value="男">
										女：<input type="radio" name="sex" value="女">
									</div>
									
							</div>
							
							<div class="form-group">
								<label>职业</label>
								<select class="form-control" id="work1">
									<option>html5</option>
									<option>ios</option>
									<option>java</option>
								</select>
							</div>


					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary asce" data-dismiss="modal">确定</button>
					</div>
					</div>
				</div>
				</div>
			`)
				$("#myModal1").modal("show")
                //确定键
				$('.asce').click(function(){
					let username=$('#username1').val();
					let password=$('#password1').val();
					let sex=$('#sex1 input[type="radio"]:checked').val();
					let work=$('#work1').val();
					let obj={
						username:username,
						password:password,
						sex:sex,
						work:work
					}
					lists[index]=obj;
					localStorage.setItem("key",JSON.stringify(lists));
					alert('修改成功')
					location.reload()
				})

		})
	}





    //删除
            function delet(){
                $('.delet').click(function(){
					let index = $(this).attr('name');
					lists.splice(index,1)
					localStorage.setItem('key',JSON.stringify(lists))
					alert('删除成功')
					location.reload()
				})
            }
    //搜索

    $('.sousuo').click(function(){
        let users = $('#sousuo').val();
        let arr = lists.filter(item=>item.username==users)
        let data = arr[0]
        if(arr.length>0){
            motaikuang(data)
        }else{
            alert('查无此人')
        }
    })




})