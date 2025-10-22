(function(){
  // Demo credentials
  const DEMO_USER = {email:'demo@quickdrop.test', password:'demo123', name:'Demo Business'};

  // Utility: simple element by id
  const $ = id => document.getElementById(id);

  // --- Login page ---
  const loginForm = $('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('email').value.trim();
      const password = $('password').value;

      if(email === DEMO_USER.email && password === DEMO_USER.password){
        // store demo session in localStorage
        localStorage.setItem('qd_user', JSON.stringify({email:DEMO_USER.email, name:DEMO_USER.name}));
        window.location.href = 'dashboard.html';
      } else {
        // simple 'fake' auth for demo: accept any non-empty email/password but warn user
        if(email && password){
          localStorage.setItem('qd_user', JSON.stringify({email:email, name:email.split('@')[0]}));
          window.location.href = 'dashboard.html';
        } else {
          alert('Please enter valid credentials');
        }
      }
    });
  }

  // --- Dashboard page ---
  const user = JSON.parse(localStorage.getItem('qd_user') || 'null');
  if(document.body.classList.contains('page-dashboard')){
    if(!user){ window.location.href = 'index.html'; }
    const welcome = $('welcomeName');
    if(welcome) welcome.textContent = `Hello, ${user.name}`;

    // sample stats from stored requests
    const requests = JSON.parse(localStorage.getItem('qd_requests') || '[]');
    $('stat-count').textContent = requests.length;
    const total = requests.reduce((s,r)=> s + Number(r.cost || 0), 0).toFixed(2);
    $('stat-earn').textContent = total;

    const historyList = $('historyList');
    if(requests.length){
      historyList.innerHTML = '';
      requests.slice().reverse().forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${r.businessName}</strong> — ${r.pickup} → ${r.delivery}<br><span class="muted">${r.distance} km · R${Number(r.cost).toFixed(2)} · ${r.date || 'No date'}</span>`;
        historyList.appendChild(li);
      });
    }

    // logout
    const logoutBtn = $('logoutBtn');
    if(logoutBtn) logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('qd_user'); window.location.href='index.html'; });
  }

  // --- Request page ---
  if(document.body.classList.contains('page-request')){
    if(!user){ window.location.href = 'index.html'; }

    // prefill business name if available
    const bn = $('businessName'); if(bn) bn.value = user.name || '';

    const calculateBtn = $('calculateBtn');
    const resultBox = $('result');
    const requestForm = $('requestForm');

    function simulateDistance(min=3, max=60){
      return Math.round((Math.random() * (max - min) + min) * 10)/10; // one decimal
    }

    function calculateCost(distanceKm, weightKg){
      const baseFee = 25; // rand
      const perKm = 10; // rand per km
      let multiplier = 1;
      if(weightKg && weightKg > 20) multiplier += 0.25; // heavier packages cost more
      const total = baseFee + (distanceKm * perKm * multiplier);
      return Number(total.toFixed(2));
    }

    function estimateTime(distanceKm){
      // naive estimate: average speed 40 km/h + handling time 15 min
      const travelHours = distanceKm / 40;
      const travelMinutes = Math.round(travelHours * 60);
      const totalMinutes = travelMinutes + 15;
      const hours = Math.floor(totalMinutes/60);
      const minutes = totalMinutes % 60;
      return `${hours ? hours + 'h ' : ''}${minutes}m`;
    }

    if(calculateBtn){
      calculateBtn.addEventListener('click', ()=>{
        const pickup = $('pickup').value.trim();
        const delivery = $('delivery').value.trim();
        const weight = parseFloat($('weight').value) || 0;
        if(!pickup || !delivery){ alert('Please enter both pickup and delivery addresses.'); return; }

        const distance = simulateDistance(4, 55);
        const cost = calculateCost(distance, weight);
        const eta = estimateTime(distance);

        resultBox.innerHTML = `
          <p><strong>Distance:</strong> ${distance} km</p>
          <p><strong>Estimated cost:</strong> R${cost.toFixed(2)}</p>
          <p><strong>Estimated delivery time:</strong> ${eta}</p>
        `;

        // store last estimate for use on confirm
        localStorage.setItem('qd_lastEstimate', JSON.stringify({distance, cost, eta}));
      });
    }

    if(requestForm){
      requestForm.addEventListener('submit', e=>{
        e.preventDefault();
        const businessName = $('businessName').value.trim();
        const pickup = $('pickup').value.trim();
        const delivery = $('delivery').value.trim();
        const packageDesc = $('packageDesc').value.trim();
        const weight = parseFloat($('weight').value) || 0;
        const date = $('date').value;

        if(!pickup || !delivery || !businessName || !packageDesc){ alert('Please complete required fields.'); return; }

        // use last estimate if available, otherwise simulate
        const last = JSON.parse(localStorage.getItem('qd_lastEstimate') || 'null');
        const distance = last ? last.distance : simulateDistance(4,55);
        const cost = last ? last.cost : calculateCost(distance, weight);
        const eta = last ? last.eta : estimateTime(distance);

        const req = {id:Date.now(), businessName, pickup, delivery, packageDesc, weight, date, distance, cost, eta};

        const requests = JSON.parse(localStorage.getItem('qd_requests') || '[]');
        requests.push(req);
        localStorage.setItem('qd_requests', JSON.stringify(requests));

        // success message
        resultBox.innerHTML = `<p class="success"><strong>Request submitted</strong></p>
          <p>${businessName} — ${pickup} → ${delivery}</p>
          <p><strong>Distance:</strong> ${distance} km · <strong>Cost:</strong> R${cost.toFixed(2)} · <em>${eta}</em></p>
          <p class="muted small">You will be contacted by our operations team to confirm pickup time.</p>
        `;

        // clear last estimate
        localStorage.removeItem('qd_lastEstimate');

        // update requests list used by dashboard when the user returns
      });
    }

    // logout on request page
    const logoutBtn2 = $('logoutBtn2');
    if(logoutBtn2) logoutBtn2.addEventListener('click', ()=>{ localStorage.removeItem('qd_user'); window.location.href='index.html'; });
  }

})();
