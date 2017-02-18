var getHighlightVids = function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCq1gk88Jab1bFN-NlwJdlwd8tQAt08WG8&channelId=UCRUQQrm8_l3CVYxfq2kPMlg&part=snippet,id&order=date&maxResults=6', function(data) {
            $.each(data.items, function(idx, video) {
                    var obj = $('<object></object>');
                    obj.attr('data', 'http://www.youtube.com/embed/' + video.id.videoId);
                    obj.attr('width', 560);
                    obj.attr('height', 315);

                    var vidPlaceholder = $('#highlight' + (idx + 1));
                    vidPlaceholder.html(obj);
            });
    });
}

 var displayTeamLogos = function() {
     var baseUrl = 'http://ak-static.cms.nba.com/wp-content/uploads/sites/51/';
     var teamLogoUrls = new Object();
     teamLogoUrls['ATL'] = baseUrl + '2015/07/p-icon_atl.svg';
     teamLogoUrls['BOS'] = baseUrl + '2015/08/BOS.svg';
     teamLogoUrls['BKN'] = baseUrl + '2015/07/p-icon_bkn.svg';
     teamLogoUrls['CHA'] = baseUrl + '2015/08/CHA.svg';
     teamLogoUrls['CHI'] = baseUrl + '2015/07/p-icon_chi.svg';
     teamLogoUrls['CLE'] = baseUrl + '2015/08/Cavs_Sword400x400.svg';
     teamLogoUrls['DAL'] = baseUrl + '2015/08/p-icon_dal.svg';
     teamLogoUrls['DEN'] = baseUrl + '2015/08/DEN.svg';
     teamLogoUrls['DET'] = baseUrl + '2015/08/DET.svg';
     teamLogoUrls['GSW'] = baseUrl + '2015/08/p-icon_gsw.svg';
     teamLogoUrls['HOU'] = baseUrl + '2015/08/p-icon_hou.svg';
     teamLogoUrls['IND'] = baseUrl + '2015/08/p-icon_ind.svg';
     teamLogoUrls['LAC'] = baseUrl + '2015/08/p-icon_lac.svg';
     teamLogoUrls['LAL'] = baseUrl + '2015/08/LAL.svg';
     teamLogoUrls['MEM'] = baseUrl + '2015/08/p-icon_mem.svg';
     teamLogoUrls['MIA'] = baseUrl + '2015/08/p-icon_mia.svg';
     teamLogoUrls['MIL'] = baseUrl + '2015/08/p-icon_mil.svg';
     teamLogoUrls['MIN'] = baseUrl + '2015/08/p-icon_min.svg';
     teamLogoUrls['NOP'] = baseUrl + '2015/08/p-icon_nop.svg';
     teamLogoUrls['NYK'] = baseUrl + '2015/08/NYK.svg';
     teamLogoUrls['OKC'] = baseUrl + '2015/08/p-icon_okc.svg';
     teamLogoUrls['ORL'] = baseUrl + '2015/08/p-icon_orl.svg';
     teamLogoUrls['PHI'] = baseUrl + '2015/08/p-icon_phi.svg';
     teamLogoUrls['PHX'] = baseUrl + '2015/08/p-icon_phx.svg';
     teamLogoUrls['POR'] = baseUrl + '2015/08/p-icon_por-1.svg';
     teamLogoUrls['SAC'] = baseUrl + '2015/08/p-icon_sac.svg';
     teamLogoUrls['SAS'] = baseUrl + '2016/01/Spur_tkts.svg';
     teamLogoUrls['TOR'] = baseUrl + '2015/08/p-icon_tor-blk.svg';
     teamLogoUrls['UTA'] = baseUrl + '2015/08/p-icon_uta.svg';
     teamLogoUrls['WAS'] = baseUrl + '2015/08/p-icon_was.svg';

     $.getJSON('/JSON/teams.json', function(data) {
             var wrapperDiv = $('#teamLogos');
             $.each(data, function(idx, team) {
                     var outerDiv = $('<div></div>');
                     var titleDiv = $('<div></div>');
                     var logoDiv = $('<div></div>');
                     outerDiv.attr('class', 'col-lg-2 col-md-4 col-xs-6 columns');
                     titleDiv.addClass('team-name');
                     logoDiv.addClass('team-logo');
                     outerDiv.append(titleDiv);
                     outerDiv.append(logoDiv);
                     titleDiv.text(team.city + ' ' + team.team_name);
                     var img = $('<input></input>');
                     img.addClass('rotate-icon');
                     img.attr('id', 'logo' + team.abbreviation);
                     img.attr('title', team.city + ' ' + team.team_name);
                     img.attr('type', 'image');
                     img.attr('src', teamLogoUrls[team.abbreviation]);
                     img.attr('value', team.abbreviation);
                     img.click(displayPlayerInfo);
                     logoDiv.append(img);
                     wrapperDiv.append(outerDiv);
             });
    $('#logoATL').trigger('click');
             
     });
 }

$(document).ready(function() {
    getHighlightVids();
    displayTeamLogos();
});

function displayPlayerInfo() {
        var abbr = $(this).val();
        var teamName =  $(this).attr('title');
        var imgUrl = $(this).attr('src');
        $('#teamName span').text(teamName);
        $('#tblTeamLogo').attr('src', imgUrl);
        $.getJSON('/JSON/players.json', function(players) {
                var filterPlayers = [];
                $.each(players, function(index, player) {
                        if (player.team == abbr){
                                filterPlayers.push(player);
                        }
                });
                var playerCount = filterPlayers.length;

                        var tbody = $('#playerData');
                        tbody.html('');
                
                $.each(filterPlayers, function(index, player) {
                        var row = $('<tr></tr>');

                        var cellName = $('<td></td>');
                        var cellTeam = $('<td></td>');
                        var cellPosition = $('<td></td>');
                        var cellHeight = $('<td></td>');
                        var cellWeight = $('<td></td>');
                        var cellDob = $('<td></td>');
                        var cellSchool = $('<td></td>')

                        cellName.text(player.name);
                        cellTeam.text(player.team);
                        cellPosition.text(player.position);
                        cellHeight.text(player.height);
                        cellWeight.text(player.weight);
                        cellDob.text(player.dob);
                        cellSchool.text(player.school);

                        row.append(cellName, cellTeam, cellPosition, cellHeight, cellWeight, cellDob, cellSchool);
                        tbody.append(row);
                });
                 window.location.assign('#players');
        });
}