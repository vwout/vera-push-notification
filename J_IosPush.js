// device service
var IOS_UPnP_S = "urn:upnp-org:serviceId:IOSPush1";

//local ip
var ipaddress = data_request_url;

//global variabless
var v_installid="";

var mytableProwl         = new Array(["<B>API Key</B>","",'ProwlAPIKey'],["<B>Application Name</B> ","",'ProwlApplication']);
var mytableProwl_select  = new Array(["Add Vera serial to subject","",'ProwlAddSerialToSubject'],["Default Priority","",'ProwlDefaultPriority']);
var mytableProwl_static  = new Array(["Remaining Prowl messages","",'ProwlRemaining'],["Reset Date","",'ProwlResetDate']);

var mytablePo            = new Array(["<B>User Key</B>","",'PushOverUserKey'],["<B>Application Name </B>","",'PushOverApplication'] );
var mytablePo_select     = new Array(["Add Vera serial to subject","",'PushOverAddSerialToSubject'],["Default Priority","",'PushOverDefaultPriority'],["Default Sound","",'PushOverSoundList']);
var mytablePo_static     = new Array(["<B>Actual Default Sound</B>","",'PushOverSound'],["<B>Template state</B>","",'UseTemplate'] );

var CommonStartPos       = 0;
var nbCommonItem         = 1;
var nbXendItem           = 8;
var nbPushOverItem       = 7;
var nbProwlItem          = 6; 
var nbBoxcarItem         = 8; 

var XendStartPos        = CommonStartPos + nbCommonItem;
var PushOverStartPos    = XendStartPos + nbXendItem;
var ProwlStartPos       = PushOverStartPos + nbPushOverItem;
var BoxcarStartPos      = ProwlStartPos + nbProwlItem;

var aInfos = new Array( 
                       ["<B>Template state</B>","",'UseTemplate'],                                      // Common  0                      
                       ["<B>Username</B>","",'XendAppUserName'],                                        // XendApp 0
                       ["<B>Password</B>","",'XendAppPassword'],                                        // 1
                       ["<B>Application Name</B>","",'XendAppApplication'],                             // 2
                       ["Channel Name","",'XendAppChannelName'],                                        // 3
                       ["Channel ID","",'XendAppChannelID'],                                            // 4
                       ["Default Channel","",'XendAppDefaultChannel'],                                  // 5
                       ["Count","",'XendAppCount'],                                                     // 6
                       ["Add Vera serial to subject","",'XendAddSerialToSubject'],                      // 7
                       ["<B>User Key</B>","",'PushOverUserKey'],                                        // PuhOver 0
                       ["<B>Application Name </B>","",'PushOverApplication'],                           // 1
                       ["Add Vera serial to subject","",'PushOverAddSerialToSubject'],                  // 2
                       ["Default Priority","",'PushOverDefaultPriority'],                               // 3
                       ["Default Sound","",'PushOverSoundList'],                                        // 4
                       ["<B>Actual Default Sound</B>","",'PushOverSound'],                              // 5
                       ["<B>Custom Application key used.</B>","",'PushOverUseCustomAppKey'],            // 6                       
                       ["<B>API Key</B>","",'ProwlAPIKey'],                                             // Prowl 0
                       ["<B>Application Name</B> ","",'ProwlApplication'],                              // 1
                       ["Add Vera serial to subject","",'ProwlAddSerialToSubject'],                     // 2
                       ["Default Priority","",'ProwlDefaultPriority'],                                  // 3
                       ["Remaining Prowl messages","",'ProwlRemaining'],                                // 4
                       ["Reset Date","",'ProwlResetDate'],                                              // 5
                       ["<B>Token</B>","",'BoxcarToken'],                                               // Boxcar 0
                       ["<B>Application Name</B> ","",'BoxcarApplication'],                             // 1
                       ["Add Vera serial to subject","",'BoxcarAddSerialToSubject'],                    // 2
                       ["Remaining Boxcar messages","",'BoxcarRemaining'],                              // 3
                       ["Reset Date","",'BoxcarResetDate'],                                             // 4
                       ["Source Name","",'BoxcarSourceName'],                                           // 5
                       ["Default Sound","",'BoxcarDefaultSound'],                                       // 6
                       ["Default Icon","",'BoxcarDefaultIcon']                                          // 7
                       );


//*****************************************************************************
//  function: Base64 Encoding
//*****************************************************************************

var Base64 = { 
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = Base64._utf8_encode(input);
        
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        
        return output;
    },
    
    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            
            output = output + String.fromCharCode(chr1);
            
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        
        output = Base64._utf8_decode(output);
        
        return output;
    },
    
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        
        return utftext;
    },
    
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        
        while ( i < utftext.length ) { 
            c = utftext.charCodeAt(i);
            
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        
        return string;
    }
}


// 
//*****************************************************************************
//  function: ReadValues
//  Refresh state
//*****************************************************************************
function ReadValues( device )
{        
    var sTemp="";
    
    Debug = get_device_state ( device, IOS_UPnP_S, "Debug" );
    for(i = 0; i < aInfos.length; i++)
    { 
        sTemp = get_device_state (device, IOS_UPnP_S, aInfos[i][2], 1);
        if ( typeof (sTemp) !== "undefined" )
        {  
            aInfos[i][1]= sTemp;
        }
        else
        {    
            aInfos[i][1]="";
        }
    }
}


//*****************************************************************************
//  function: messagetextedit
//*****************************************************************************
function testmessageedit (device)
{
    var html = '';
    
    ReadValues( device );
        
    // we create a status area
    html += '<div><p id="status_display" style="width:80%; position:relative; margin-left:auto; margin-right:auto; table-layout:fixed; text-align:center; border-radius: 5px; color:black"></div>';
        
    // we create a table which will contain all variables
    html += '<table border=0 style="width:80%; position:relative; margin-left:auto; margin-right:auto; border-radius: 5px">';
    
    // show titles
    html += '<tr>';
    html += '<th style="font-weight:bold; text-align:left; width:100%">Message text :</th>';
    html += '</tr>';
    
    html += '<tr>';
    html += '<td>' + '<INPUT id="msg" style="width:100%" type="text" maxlength="500" autofocus></INPUT>' + '</td>';
    html += '</tr>';

    html += '<tr><td></td></tr>';
    
    html += '<tr><td>';    
    html += '<B>Notification method : </B>';
    html += '</td></tr>';
    
    html += '<tr><td><select id="method">';
    html += '<option value=1>Prowl</option>';
    html += '<option value=2>Push Over</option>';
    html += '<option value=4>XendApp</option>';
    html += '<option value=5>Boxcar</option>';
    html += '</select>';

    html += '</td>';
    html += '</tr>';

    html += '<tr><td></td></tr>';
    // show buttons
    html += '<tr>';
    
    html += '<td><input type="button" value="Send Message" onClick="test_message(' + device + ')" style="margin-left:auto; margin-right:auto; background:#3295F8; color:white; text-align:center; border-radius:5px; padding-top:4px; text-transform:capitalize; font-family:Arial; font-size:14px; cursor:pointer; -khtml-border-radius: 5px; -webkit-border-radius:5px"/></td>';
    html += '</tr>';
    
    html += '</table>';
    
    set_panel_html (html);
    
}

//*****************************************************************************
//  function: xendedit
//*****************************************************************************
function xendedit (device)
{
    ReadValues( device );
    
    var html = '';
               
    // we create a status area
    html += '<div><p id="status_display" style="width:80%; position:relative; margin-left:auto; margin-right:auto; table-layout:fixed; text-align:center; border-radius: 5px; color:black"></div>';
    
    // we create a table which will contain all variables
    html += '<table border=0 style="width:80%; position:relative; margin-left:auto; margin-right:auto; border-radius: 5px">';
    
    // show titles
    html += '<tr>';
    html += '<th style="font-weight:bold; text-align:left; width:30%">XendApp Parameters :</td>';
    html += '<th style="font-weight:bold; text-align:left; width:70%"></td>';
    html += '</tr>';

    //
    // Finir Mofification variable Modif
    //
    //
    //
    //
    
    html += '<tr>';
    html += '<td>' + aInfos[XendStartPos][0] + '</td>';
    html += '<td><input type="text" id="name' + i + '" value="' + aInfos[XendStartPos][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  XendStartPos  + ', this.value)" /></td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>' + aInfos[XendStartPos+1][0] + '</td>';
    html += '<td><input type="text" id="pwd' + i + '" value="' + aInfos[XendStartPos+1][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (XendStartPos+1)  + ', this.value)" /></td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>' + aInfos[XendStartPos+2][0] + '</td>';
    html += '<td><input type="text" id="pwd' + i + '" value="' + aInfos[XendStartPos+2][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (XendStartPos+2)  + ', this.value)" /></td>';
    html += '</tr>';
    
    html += '<tr>';
    html += '<td><B>Default Channel<B></td>';
    html += '<td>';
    html += '<select name="select_channel" onChange="save_varex(' + device + ', ' +  (XendStartPos+5)  + ', this.options[this.selectedIndex].value );" onkeyup="save_varex(' + device + ', ' +  (XendStartPos+5)  + ', this.options[this.selectedIndex].value );">';
    
    // Read Channels Info
    var reg=new RegExp("[,]+", "g");
    var cn_name=aInfos[XendStartPos+3][1].split(reg);
    var cn_id=aInfos[XendStartPos+4][1].split(reg);
    
    
    for (var i=0; i < cn_name.length; i++) 
    {
        html += '<option value=';
        html += cn_id[i];
        if ( aInfos[XendStartPos+5][1] == cn_id[i] ) { html += ' selected="selected"'; }
        html += '>';
        html +=  cn_name[i]; 
        html += '</option>';    
    }
    
    html += '</select>';
    html += '</td>';
    html += '</tr>';
    
    html += '<tr>';
    html += '<td>' + aInfos[XendStartPos+7][0] + '</td>';
    html += '<td>';
    html += '<select name="select_serial" onChange="save_var(' + device + ', ' +  (XendStartPos+7)  + ', this.options[this.selectedIndex].value );" onkeyup="save_var(' + device + ', ' +  (XendStartPos+7)  + ', this.options[this.selectedIndex].value );">';
    html += '<option ';
    if ( Number(aInfos[XendStartPos+7][1]) == 0 ) { html += 'selected="selected"'; }           
    html += ' value="0">No</option>';
    html += '<option ';
    if ( Number(aInfos[XendStartPos+7][1]) == 1 ) { html += 'selected="selected"'; }                        
    html += 'value="1">Yes</option>';
    html += '</select>';
    html += '</td>';
    html += '</tr>';
    
    // show buttons
    html += '<tr>';
    // saveall_var (luupcode,device,startpos,nbitem)
    html += '<td colspan=2><input type="button" value="SAVE" onClick="saveall_var(' + device + ',' +  XendStartPos + ',' + nbXendItem + ')" style="margin-left:87%; background:#3295F8; color:white; text-align:center; border-radius:5px; padding-top:4px; text-transform:capitalize; font-family:Arial; font-size:14px; cursor:pointer; -khtml-border-radius: 5px; -webkit-border-radius:5px"/></td>';
    html += '</tr>';    
    html += '</table>';

    html += '<P>';    
    html += '<table id="count" border=0 position:relative; margin-left:auto; margin-right:auto; border-radius: 5px>';
    html += '<tr>';
    html += '<td colspan="3">';
    
    // we create a status area
    html += '<div><p id="channelid_display"></p></div>';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += "<td>Number of message(s) sent : </td>";
    html += "<td>";
    html += get_device_state (device, IOS_UPnP_S, "XendAppCount", 1);
    html += "</td>";
    html += "<td>" ;  
    html += '&nbsp;&nbsp;(<A href="#" onclick="resetcount_xend(' + device + ');">Reset</A>)';
    html += "</td>";
    html += "</tr>";
    html += '</table>';
    html += '<table>';
    html += '<tr><td>';
    html += 'More informations on service : <A HREF="http://xendapp.com" target="_blank">XendApp web site.'
    html += '</td></tr>'
    html += '</table>';
    
    
    set_panel_html (html);
    
}



//*****************************************************************************
//  function: pushoveredit
//*****************************************************************************
function pushoveredit (device)
{
    ReadValues( device );
    var html = '';
        
  for(i = 0; i < mytablePo.length; i++)
  {  mytablePo[i][1]=get_device_state (device, IOS_UPnP_S, mytablePo[i][2], 1); }

  for(i = 0; i < mytablePo_select.length; i++)
  {  mytablePo_select[i][1]=get_device_state (device, IOS_UPnP_S, mytablePo_select[i][2], 1); }
  
  for(i = 0; i < mytablePo_static.length; i++)
  {  mytablePo_static[i][1]=get_device_state (device, IOS_UPnP_S, mytablePo_static[i][2], 1); }
    
    
  {
    // we create a status area
    html += '<div><p id="status_display" style="width:80%; position:relative; margin-left:auto; margin-right:auto; table-layout:fixed; text-align:center; border-radius: 5px; color:black"></div>';  
      
    // we create a table which will contain all variables
    html += '<table style="width:80%; position:relative; margin-left:auto; margin-right:auto; border-radius: 5px">';

    // show titles
    html += '<tr>';
      html += '<th style="font-weight:bold; text-align:left; width:30%">PushOver Parameters :</td>';
      html += '<th style="font-weight:bold; text-align:left; width:70%"></td>';
    html += '</tr>';

    for (i = 0; i < mytablePo.length; i++)
    {
      html += '<tr>';
      html += '<td>' + mytablePo[i][0] + '</td>';
      html += '<td><input type="text" id="v' + i + '" value="' + mytablePo[i][1] + '" style="width:95%; text-align:left" onkeyup="save_po(' + device + ', ' + i + ', this.value)" /></td>';
      html += '</tr>';
    }

            html += '<tr>';
      html += '<td>' + mytablePo_select[0][0] + '</td>';
      html += '<td>';
            html += '<select name="select_serial" onChange="save_po_select(' + device + ', ' + 0 + ', this.options[this.selectedIndex].value );">';
            html += '<option ';
            if ( Number(mytablePo_select[0][1]) == 0 ) { html += 'selected="selected"'; }           
            html += ' value="0">No</option>';
            html += '<option ';
            if ( Number(mytablePo_select[0][1]) == 1 ) { html += 'selected="selected"'; }                        
            html += 'value="1">Yes</option>';
            html += '</select>';
      html += '</td>';
      html += '</tr>';

            html += '<tr>';
      html += '<td><I>' + mytablePo_select[1][0] + '</I></td>';
      html += '<td>';
            html += '<select name="select_po_serial" onChange="save_po_select(' + device + ', ' + 1 + ', this.options[this.selectedIndex].value );">';
            html += '<option ';
            if ( Number(mytablePo_select[1][1]) == 0 ) { html += 'selected="selected"'; }           
            html += ' value="0">Normal</option>';
            html += '<option ';
            if ( Number(mytablePo_select[1][1]) == 1 ) { html += 'selected="selected"'; }                        
            html += 'value="1">High</option>';
            html += '<option ';
            if ( Number(mytablePo_select[1][1]) == -1 ) { html += 'selected="selected"'; }                        
            html += 'value="-1">Low</option>';
            html += '</select>';

      html += '</td>';
      html += '</tr>';
      
      if (  mytablePo_select[2][1].length != 0  )
      {
          html += '<tr>';
          html += '<td><I>' + mytablePo_select[2][0] + '</I></td>';
          html += '<td>';
          html += '<select name="select_po_sound" onChange="save_po_sound(' + device + ', ' + 0 + ', this.options[this.selectedIndex].value );">';
          
          var reg=new RegExp("[ ,]+", "g");
          var sound_tab=mytablePo_select[2][1].split(reg);
          for (var i=0; i<sound_tab.length; i++) 
          {
              html += '<option ';
              html += 'value="' +  sound_tab[i] + '"';
              if ( mytablePo_static[0][1] == sound_tab[i] )
                { html += ' selected="selected" '; }
              html += '>';
              html += capitaliseFirstLetter( sound_tab[i] ) + '</option>';
          }
          html += '</select>';
          //      html += mytablePo[2][1];                                    
          html += '</td>';
          html += '</tr>';
      }
      

     // show buttons
    html += '<tr>';

      html += '<td colspan="2"><input type="button" value="SAVE" onClick="saveall_po(1,' + device + ')" style="margin-left:87%; background:#3295F8; color:white; text-align:center; border-radius:5px; padding-top:4px; text-transform:capitalize; font-family:Arial; font-size:14px; cursor:pointer; -khtml-border-radius: 5px; -webkit-border-radius:5px"/></td>';
    html += '</tr>';

    html += '</table>';
  }

    html += '<BR><P><BR>';
    
    html += '<table id="count" border=0 position:relative; margin-left:auto; margin-right:auto; border-radius: 5px>';
    
    html += '<tr>';
    html += '<td colspan=3>';
    if ( Number(aInfos[PushOverStartPos+6][1] ) == 1 ) 
    {     
        html += aInfos[PushOverStartPos+6][0];
    }
    html += '</td>';
    html += '</tr>';
    
    html += '<tr>';
    html += "<td>Number of message(s) sent : </td>";
    html += "<td>";
    html += get_device_state (device, IOS_UPnP_S, "PushOverCount", 1);
    html += "</td>";
    html += "<td>" ;  
    html += '&nbsp;&nbsp;(<A href="#" onclick="resetcount_pushover(' + device + ');">Reset</A>)';
    html += "</td>";
    html += "</tr>";
    html += '</table>';
    html += '<table>';
    html += '<tr><td>';
    html += 'More informations on service : <A HREF="http://pushover.net" target="_blank">PushOver web site.'
    html += '</td></tr>'
    html += '</table>';
    
   set_panel_html (html);

}


//*****************************************************************************
//  function: prowledit
//*****************************************************************************
function prowledit (device)
{
    ReadValues( device );
    
    var html = '';
    /*
    for(i = 0; i < mytableProwl.length; i++)
    {  mytableProwl[i][1]=get_device_state (device, IOS_UPnP_S, mytableProwl[i][2], 1); }
    
    for(i = 0; i < mytableProwl_select.length; i++)
    {   mytableProwl_select[i][1]=get_device_state (device, IOS_UPnP_S, mytableProwl_select[i][2], 1); }
    
    for(i = 0; i < mytableProwl_static.length; i++)
    {   mytableProwl_static[i][1]=get_device_state (device, IOS_UPnP_S, mytableProwl_static[i][2], 1); }
    */
    
    {
        // we create a status area
        html += '<div><p id="status_display" style="width:80%; position:relative; margin-left:auto; margin-right:auto; table-layout:fixed; text-align:center; border-radius: 5px; color:black"></div>';
        
        // we create a table which will contain all variables
        html += '<table style="width:80%; position:relative; margin-left:auto; margin-right:auto; border-radius: 5px">';
        
        // show titles
        html += '<tr>';
        html += '<th style="font-weight:bold; text-align:left; width:30%">Prowl Parameters :</td>';
        html += '<th style="font-weight:bold; text-align:left; width:70%"></td>';
        html += '</tr>';
        
        html += '<tr>';
        html += '<td>' + aInfos[ProwlStartPos][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[ProwlStartPos][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  ProwlStartPos  + ', this.value)" /></td>';
        html += '</tr>';
 
        
        html += '<tr>';
        html += '<td>' + aInfos[ProwlStartPos+1][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[ProwlStartPos+1][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (ProwlStartPos+1)  + ', this.value)" /></td>';
        html += '</tr>';
                
        html += '<tr>';
        html += '<td>' + aInfos[ProwlStartPos+2][0] + '</td>';
        html += '<td>';
        html += '<select name="select_serial" onChange="save_var(' + device + ', ' +  (ProwlStartPos+2)  + ', this.options[this.selectedIndex].value );">';
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+2][1]) == 0 ) { html += 'selected="selected"'; }           
        html += ' value="0">No</option>';
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+2][1]) == 1 ) { html += 'selected="selected"'; }                        
        html += 'value="1">Yes</option>';
        html += '</select>';
        html += '</td>';
        html += '</tr>';
                        
        html += '<tr>';
        html += '<td><I>' + aInfos[ProwlStartPos+3][0] + '</I></td>';
        html += '<td>';
        html += '<select name="select_priority" onChange="save_select(' + device + ', ' + 1 + ', this.options[this.selectedIndex].value );">';
        
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+3][1]) == -2 ) { html += 'selected="selected"'; }           
        html += ' value="-2">Very low</option>';
        
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+3][1]) == -1 ) { html += 'selected="selected"'; }           
        html += ' value="-1">Moderate</option>';
        
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+3][1]) == 0 ) { html += 'selected="selected"'; }           
        html += ' value="0">Normal</option>';
        
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+3][1]) == 1 ) { html += 'selected="selected"'; }           
        html += ' value="1">High</option>';
        
        html += '<option ';
        if ( Number(aInfos[ProwlStartPos+3][1]) == 2 ) { html += 'selected="selected"'; }           
        html += ' value="2">Emergency</option>';
        
        html += '</select>';
        html += '</td>';
        html += '</tr>';
        
        
        
        
        // show save button
        html += '<tr>';
        html += '<td colspan="2"><input type="button" value="SAVE" onClick="saveall_var(' + device + ',' +  ProwlStartPos + ',' + nbProwlItem + ')" style="margin-left:87%; background:#3295F8; color:white; text-align:center; border-radius:5px; padding-top:4px; text-transform:capitalize; font-family:Arial; font-size:14px; cursor:pointer; -khtml-border-radius: 5px; -webkit-border-radius:5px"/></td>';
        html += '</tr>';
        html += '</table>';
    }
    
    html += '<BR><P><BR>';
    
    //
    html += '<table id="count" border=0 position:relative; margin-left:auto; margin-right:auto; border-radius: 5px>';
    html += '<tr>';
    html += "<td>Number of message(s) sent : </td>";
    html += "<td>";    
    html += get_device_state (device, IOS_UPnP_S, "ProwlCount", 1);
    html += "</td>";
    html += "<td>" ;      
    html += '&nbsp;&nbsp;(<A href="#" onclick="resetcount_prowl(' + device + ');">Reset</A>)'
    html += '</td></tr>';
    html += '</table>';
    html += '<table>';
    html += '<tr><td>';
    html += 'You have ' + aInfos[ProwlStartPos+4][1] + ' message(s) available, the counter will be reseted to 1000 on ' +  timeConverter( aInfos[ProwlStartPos+5][1] )
    html += '</td></tr>';        
    html += '<tr><td>More informations on service : <A HREF="http://prowlapp.com" target="_blank">Prowl web site.</tr></td>'
    html += '</table>';
    
    set_panel_html (html);
}

//*****************************************************************************
//  function: boxcarledit
//*****************************************************************************
function boxcaredit (device)
{
    ReadValues( device );
    
    var html = '';
    
    {
        // we create a status area
        html += '<div><p id="status_display" style="width:80%; position:relative; margin-left:auto; margin-right:auto; table-layout:fixed; text-align:center; border-radius: 5px; color:black"></div>';
        
        // we create a table which will contain all variables
        html += '<table style="width:80%; position:relative; margin-left:auto; margin-right:auto; border-radius: 5px">';
        
        // show titles
        html += '<tr>';
        html += '<th style="font-weight:bold; text-align:left; width:30%">Prowl Parameters :</td>';
        html += '<th style="font-weight:bold; text-align:left; width:70%"></td>';
        html += '</tr>';
        
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[BoxcarStartPos][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  BoxcarStartPos  + ', this.value)" /></td>';
        html += '</tr>';
 
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos+1][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[BoxcarStartPos+1][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (BoxcarStartPos+1)  + ', this.value)" /></td>';
        html += '</tr>';
		
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos+5][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[BoxcarStartPos+5][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (BoxcarStartPos+5)  + ', this.value)" /></td>';
        html += '</tr>';
		
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos+6][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[BoxcarStartPos+6][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (BoxcarStartPos+6)  + ', this.value)" /></td>';
        html += '</tr>';
		
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos+7][0] + '</td>';
        html += '<td><input type="text" id="v' + i + '" value="' + aInfos[BoxcarStartPos+7][1] + '" style="width:95%; text-align:left" onkeyup="save_var(' + device + ', ' +  (BoxcarStartPos+7)  + ', this.value)" /></td>';
        html += '</tr>';
                
        html += '<tr>';
        html += '<td>' + aInfos[BoxcarStartPos+2][0] + '</td>';
        html += '<td>';
        html += '<select name="select_serial" onChange="save_var(' + device + ', ' +  (BoxcarStartPos+2)  + ', this.options[this.selectedIndex].value );">';
        html += '<option ';
        if ( Number(aInfos[BoxcarStartPos+2][1]) == 0 ) { html += 'selected="selected"'; }           
        html += ' value="0">No</option>';
        html += '<option ';
        if ( Number(aInfos[BoxcarStartPos+2][1]) == 1 ) { html += 'selected="selected"'; }                        
        html += 'value="1">Yes</option>';
        html += '</select>';
        html += '</td>';
        html += '</tr>';
        
        // show save button
        html += '<tr>';
        html += '<td colspan="2"><input type="button" value="SAVE" onClick="saveall_var(' + device + ',' +  BoxcarStartPos + ',' + nbBoxcarItem + ')" style="margin-left:87%; background:#3295F8; color:white; text-align:center; border-radius:5px; padding-top:4px; text-transform:capitalize; font-family:Arial; font-size:14px; cursor:pointer; -khtml-border-radius: 5px; -webkit-border-radius:5px"/></td>';
        html += '</tr>';
        html += '</table>';
    }
    
    html += '<BR><P><BR>';
    
    //
    html += '<table id="count" border=0 position:relative; margin-left:auto; margin-right:auto; border-radius: 5px>';
    html += '<tr>';
    html += "<td>Number of message(s) sent : </td>";
    html += "<td>";    
    html += get_device_state (device, IOS_UPnP_S, "BoxcarCount", 1);
    html += "</td>";
    html += "<td>" ;      
    html += '&nbsp;&nbsp;(<A href="#" onclick="resetcount_boxcar(' + device + ');">Reset</A>)'
    html += '</td></tr>';
    html += '</table>';
    html += '<table>';
    html += '<tr><td>';
    html += 'You have ' + aInfos[BoxcarStartPos+3][1] + ' message(s) available, the counter will be reseted to 1000 on ' +  timeConverter( aInfos[BoxcarStartPos+4][1] )
    html += '</td></tr>';        
    html += '<tr><td>More informations on service : <A HREF="https://boxcar.io/" target="_blank">Boxcar web site.</tr></td>'
    html += '</table>';
    
    set_panel_html (html);
}


//*****************************************************************************
//  function: Reset Count
//*****************************************************************************
function resetcount_pushover (device)
{
	
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&DeviceNum=' + device + '&serviceId=' + IOS_UPnP_S + '&action=ResetPushOverCount', false );
    xmlHttp.send( null );
    
    var x=document.getElementById('count').rows
    var y=x[1].cells
    y[1].innerHTML="0"
    
    showStatus ("COUNT RESET DONE...", false);    
    
}

function resetcount_boxcar (device)
{
	
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&DeviceNum=' + device + '&serviceId=' + IOS_UPnP_S + '&action=ResetBoxcarCount', false );
    xmlHttp.send( null );
    
    var x=document.getElementById('count').rows
    var y=x[0].cells
    y[1].innerHTML="0"
    
    showStatus ("COUNT RESET DONE...", false);    
    
}

function resetcount_prowl (device)
{
	
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&DeviceNum=' + device + '&serviceId=' + IOS_UPnP_S + '&action=ResetProwlCount', false );
    xmlHttp.send( null );
    
    var x=document.getElementById('count').rows
    var y=x[0].cells
    y[1].innerHTML="0"
    
    showStatus ("COUNT RESET DONE...", false);    
    
}

function resetcount_xend (device)
{	
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&DeviceNum=' + device + '&serviceId=' + IOS_UPnP_S + '&action=ResetXendAppCount', false );
    xmlHttp.send( null );
    
    var x=document.getElementById('count').rows;
    var y=x[1].cells;
    y[1].innerHTML="0";
    
    showStatus ("COUNT RESET DONE...", false);    
    
}



//*****************************************************************************
//  function: Message Test
//*****************************************************************************
function test_message (device)
{
    var m=document.getElementById('method').selectedIndex;
    var t=document.getElementById('msg').value;
        
    switch(m)
    {
        case 0:
            test_prowl (device, t);
            break;
         case 1:
            test_pushover (device, t);
            break;
        case 2:
            // Toasty is deprecated
            break;
        case 3:
            test_xend (device, t);
            break;
        case 4:
            test_boxcar (device, t);
            break;
            
            
        default:
     }
    
    
}

function test_boxcar (device, m)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    url = ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendBoxcarNotification",{ Title= "Title", Message="' + encodeURIComponent(m) + '"}, '+ device +')';

    xmlHttp.open( "GET",url , false );
    xmlHttp.send( null );
}

function test_xend (device, m)
{
    
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    url =  ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendXendAppNotification",{ Subject="", Message="' +  encodeURIComponent(m) + '", Channel="' + '" },'+ device +')';
                                                                                                                                                                                                                                                                            
    xmlHttp.open( "GET",url , false );
    xmlHttp.send( null );

}


function test_pushover (device, m)
{
	// luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendPushOverNotification",{ Title= "Title", Message="Message", Priority=1, URL="", URLTitle=""}, 99)
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    url =  ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendPushOverNotification",{ Subject= "Test Subject", Message="' +  encodeURIComponent(m)  + '", Priority="' + mytablePo_select[1][1]  + '", URL="", URLTitle="", Sound="' +  mytablePo_static[0][1] + '"},'+ device +')';        
    
    xmlHttp.open( "GET",url , false );
    xmlHttp.send( null );
}


function test_prowl (device, m)
{
	// luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendProwlNotification",{ Event= "Title", Description="Message", Priority=2, URL=""}, 99)
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    url = ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.call_action("urn:upnp-org:serviceId:IOSPush1", "SendProwlNotification",{ Event= "Title", Description="' + encodeURIComponent(m) + '", Priority="' + mytableProwl_select[1][1] + '", URL=""}, '+ device +')';

    xmlHttp.open( "GET",url , false );
    xmlHttp.send( null );
}

//*****************************************************************************
// function: timestamp converter
//*****************************************************************************
function timeConverter(UNIX_timestamp)
{
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var sec = a.getSeconds();
     var time = date+' '+month+' '+year+' '+hour+':'+min+':'+sec ;
     return time;
 }


//*****************************************************************************
// function: showStatus
//*****************************************************************************
function showStatus (text, error)
{
  if (!error)
  {
    document.getElementById ('status_display').style.backgroundColor = "#90FF90";
    document.getElementById ('status_display').innerHTML = text;
  }
  else
  {
    document.getElementById ('status_display').style.backgroundColor = "#FF9090";
    document.getElementById ('status_display').innerHTML = text;
  }
}

//*****************************************************************************
// function: xend_channel_change
//*****************************************************************************
function xend_channel_change (device, id, text)
{
    document.getElementById ('channelid_display').innerHTML = 'Channel ID : ' + text;
}



//*****************************************************************************
//  function: save => variable
//*****************************************************************************
function save (deviceid, index, newValue)
{
  showStatus ("UNSAVED CHANGES!", true);
    _console("New Vaue =======>" + newValue );
  mytableProwl[index][1] = newValue;
}

function save_po (deviceid, index, newValue)
{
  showStatus ("UNSAVED CHANGES!", true);
    _console("New Vaue =======>" + newValue );
  mytablePo[index][1] = newValue;
}


function save_po_sound (deviceid, index, newValue)
{
    showStatus ("UNSAVED CHANGES!", true);
    _console("New Vaue =======>" + newValue );
    mytablePo_static[index][1] = newValue;
}


function save_to (deviceid, index, newValue)
{
    showStatus ("UNSAVED CHANGES!", true);
    _console("New Vaue =======>" + newValue );
    aInfos[ToastyStartPos+index][1]= newValue
}

function save_var (deviceid, index, newValue)
{
    showStatus ("UNSAVED CHANGES!", true);
    _console("Saving New Vaue ==>" + newValue );
    aInfos[index][1]= newValue
}


function save_varex (deviceid, index, newValue )
{
    showStatus ("UNSAVED CHANGES!", true);
    _console("SavingEx New Vaue ==>" + newValue );
    aInfos[index][1]= newValue
    
    document.getElementById ('channelid_display').innerHTML = 'Channel ID : ' + newValue;
    
}





//*****************************************************************************
//  function: save => variable
//*****************************************************************************
function save_select (deviceid, index, newValue)
{
  showStatus ("UNSAVED CHANGES!" , true);
    _console("New Vaue =======>" + newValue );
  mytableProwl_select[index][1] = newValue;
}

function save_po_select (deviceid, index, newValue)
{
  showStatus ("UNSAVED CHANGES!" , true);
    _console("New Vaue =======>" + newValue );
  mytablePo_select[index][1] = newValue;
    
}

//*****************************************************************************
//  function: CapitalizeFirstLetter
//*****************************************************************************
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//*****************************************************************************
//  function: saveall
//*****************************************************************************
function saveall (luupcode,device)
{
  showStatus ("SAVING...", false);

  for (i = 0; i < mytableProwl.length; i++)
    {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    //_console("=======> save[" + i + "]; " + mytableProwl[i]);
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ mytableProwl[i][2]+'","'+mytableProwl[i][1]+'",'+ device +')', false );
    xmlHttp.send( null );
  }
    
  for (i = 0; i < mytableProwl_select.length; i++)
    {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    //_console("=======> save[" + i + "]; " + mytableProwl_select[i]);
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ mytableProwl_select[i][2]+'","'+ mytableProwl_select[i][1]+'",'+ device +')', false );
    xmlHttp.send( null );
  }
    
    

  function finished () {showStatus ("ALL CHANGES SAVED!", false);}
  window.setTimeout(finished, 1000);
}


function saveall_po (luupcode,device)
{
  showStatus ("SAVING...", false);

  for (i = 0; i < mytablePo.length; i++)
    {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    // _console("=======> save[" + i + "]; " + mytablePo[i]);
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ mytablePo[i][2]+'","'+ mytablePo[i][1]+'",'+ device +')', false );
    xmlHttp.send( null );
  }

  for (i = 0; i < mytablePo_select.length; i++)
    {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    // _console("=======> save[" + i + "]; " + mytablePo_select[i]);
    xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ mytablePo_select[i][2]+'","'+ mytablePo_select[i][1]+'",'+ device +')', false );
    xmlHttp.send( null );
  }

  
    for (i = 0; i < mytablePo_static.length; i++)
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
       _console("=======> save[" + i + "]; " + mytablePo_static[i][1]);
        xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ mytablePo_static[i][2]+'","'+ mytablePo_static[i][1]+'",'+ device +')', false );
        xmlHttp.send( null );
    }
    
    
    
    
    
  function finished () {showStatus ("ALL CHANGES SAVED!", false);}
  window.setTimeout(finished, 1000);
}


function saveall_to (luupcode,device)
{
    showStatus ("SAVING...", false);
    //nbToastyItem
    for (i = 0; i < nbToastyItem; i++)
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        _console("=======> ToastySave[" + i + "]; " + aInfos[ToastyStartPos+i][1] );
        xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ aInfos[ToastyStartPos+i][2]+'","'+ aInfos[ToastyStartPos+i][1] +'",'+ device +')', false );
        xmlHttp.send( null );
    }

    function finished () {showStatus ("ALL CHANGES SAVED!", false);}
    window.setTimeout(finished, 1000);
}


function saveall_xend (luupcode,device)
{
    showStatus ("SAVING...", false);
    for (i = 0; i < nbXendItem; i++)
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        _console("=======> ToastySave[" + i + "]; " + aInfos[XendStartPos+i][1] );
        xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ aInfos[XendStartPos+i][2]+'","'+ aInfos[XendStartPos+i][1] +'",'+ device +')', false );
        xmlHttp.send( null );
    }
    
    function finished () {showStatus ("ALL CHANGES SAVED!", false);}
    window.setTimeout(finished, 1000);
}



function saveall_var ( device,startpos,nbitem )
{
    showStatus ("SAVING...", false);
    for (i = 0; i < nbitem; i++)
    {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        _console("=======> SaveVar[" + aInfos[startpos+i][2] + "] = " + aInfos[startpos+i][1] );
        xmlHttp.open( "GET", ''+ ipaddress +'id=lu_action&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunLua&Code=luup.variable_set("'+ IOS_UPnP_S +'","'+ aInfos[startpos+i][2]+'","'+ aInfos[startpos+i][1] +'",'+ device +')', false );
        xmlHttp.send( null );
    }
    
    function finished () {showStatus ("ALL CHANGES SAVED!", false);}
    window.setTimeout(finished, 1000);
}
