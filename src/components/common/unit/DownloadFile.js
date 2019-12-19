// download url
export default function downloadFile(response) {

    console.log("下载文件")
    // let blob = new Blob([res.data],{type: "application/vnd.ms-excel"});
    // let  objectUrl = URL.createObjectURL(blob);
    //
    // window.location.href = objectUrl;

    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    // var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    var blob = new Blob([response.data], { type: 'application/x-msdownload' });
    // var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = new Date().format('yyyyMMddhhmmss')+'.xls'; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}
