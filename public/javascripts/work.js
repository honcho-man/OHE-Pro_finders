$(document).ready(function(e) {
    //e.preventDefault()
    let select = $('.select-list')
    $.ajax({
        method: 'POST',
        url: '/jobs',
        data: {
            subject: 'A',
            type: 'default'
        },
        success: function(response) {                              
                let joblist = response.map((o) => (
                    o.job
                ))
                const jobCollection = [].concat(...joblist)
                //console.log(jobCollection)
                let jobshtml = $.map(jobCollection, function (value) {
                    return ('<option value="' + value + '">' + value + '</option>');
                })
            select.append(jobshtml.join(''))
            //console.log(response)
        },
        error: function(response) {
                select.append('<option></option>')
        }
    })
})

let jobLists = $('.job-li li')
jobLists.on('click', (e) => {
    if (e.target.classList.contains('show')) {
        //console.log('yeass')
        //console.log(e.target)
        let chev = e.target.lastChild,
            i = document.createElement('i')
        i.classList.add('lni')
        i.classList.add('lni-chevron-right')
        chev.replaceWith(i)
        e.target.classList.remove('active-job-li')
        e.target.classList.remove('show')
        e.target.nextSibling.remove()
    } else {
        let req = e.target.innerText;
        //console.log(req)
        if (req !== '') {
            e.target.classList.add('active-job-li')
            let chev = e.target.lastChild,
                i = document.createElement('i')
            i.classList.add('lni')
            i.classList.add('lni-chevron-down')
            chev.replaceWith(i)
            //console.log(chev)
            $.ajax({
                method: 'POST',
                url: '/jobs',
                data: {
                    subject: req,
                    type: 'undefault'
                },
                success: function(response) {                              
                        let joblist = response.map((o) => (
                            o.job
                        ))
                        const jobCollection = [].concat(...joblist)
                        //console.log(jobCollection)
                        let jobshtml = $.map(jobCollection, function (value) {
                            return ('<button class="list-btn" onClick="jobAnchor(this)">' + value + '</button><br>');
                        })
                    let list = jobshtml.join('');
                    let listSpan = $('<span class="job-span-list show">' + list + '</span>');
                    e.target.classList.add('show')
                    listSpan.insertAfter(e.target).fadeIn('slow')
                    //console.log(response)
                },
                error: function(response) {
                        $('span').insertAfter(e.target)
                }
            })
        }
    }
})


function jobAnchor(event) {
    let e = event,
        eDescriptionContn = $('<p class="p-2"></p>'),
        req = e.innerText,
        eDescriptionBtn = $('<div class="px-0 py-2 text-right"><button title="'+req+'" onclick="getExpert(this)" class="primary-btn desc-btn move mt-2">Chat</button></div>');
        //console.log(e)
    if (e.classList.contains('show')) {
        //console.log('event still showing, now removing class "show"')
        e.classList.remove('show')
        e.nextSibling.remove()
    } else {
        //closeDesc(e)
        //console.log('now showing event')
        e.classList.add('show')
        $.ajax({
                method: 'POST',
                url: '/jobs',
                data: {
                    subject: req,
                    type: 'description'
                },
                success: function (response) {
                    //console.log(response)
                    let jobDescriptionResponse = response.map((o) => (
                            o.description
                        ))
                        const jobDescription = [].concat(...jobDescriptionResponse)
                        //console.log(jobCollection)
                        let jobDescHtml = $.map(jobDescription, function (value) {
                            return (value);
                        })
                    let description = jobDescHtml.join('');
                    eDescriptionContn.append(description)
                    eDescriptionContn.append(eDescriptionBtn)
                    eDescriptionContn.insertAfter(e).slideDown('slow')          
                    localStorage.setItem('expert_job', req)
                    copyToClipboard(req)                    
                },
                error: function(response) {
                    eDescriptionContn.append('No result')
                    eDescriptionContn.insertAfter(e).slideDown('slow')  
                }
            })
        //console.log(eDescriptionContn)
    }
}

/*
function closeDesc(e) {
    let eve = localStorage.getItem('descriptionId')
    $(document).on('click', (event) => {
        if (eve !== event.target.innerText) {
            e.nextSibling.remove()
        } else {
            console.log('hell yeah')
        }
    })
}*/

function getExpert(event) {
    //console.log(event.title)
    let exp = localStorage.getItem('expert_job') || event.title;
    alert('Preferred expert: '+exp+', has been copied to clipboard. Please paste into required field')
    setTimeout(() => {
        if (authed == true) {
            maximizeChat()
        } else {
            window.location.href = '/dashboard?'+exp
        }
    }, 800);
}
