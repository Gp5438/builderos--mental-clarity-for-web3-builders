// Reset content database
const resetContent = {
  burnout: {
    grounding: "You're not a machine. Burnout is your system saying it needs maintenance, not that you're weak. The best builders know when to step back. What you're experiencing is real fatigue, not failure. Rest is part of the work.",
    breathing: "Take 4 deep breaths: Inhale for 4 counts, hold for 4, exhale for 6. Let your shoulders drop on each exhale. You're releasing tension that's been building.",
    microAction: "Close your laptop for 15 minutes. Set a timer. Go outside or look out a window. Don't check messages. When you return, write down ONE thing that actually matters today — not your entire backlog."
  },
  overwhelmed: {
    grounding: "Your brain is in triage mode because you're treating everything as urgent. The truth: most things can wait 24 hours without consequences. You have capacity, but not for everything at once. Clarity comes from choosing, not from doing it all.",
    breathing: "Box breathing: Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 3 times. This is what Navy SEALs use in high-pressure situations. It works.",
    microAction: "Write down everything on your mind — tasks, worries, ideas. Now circle only the ONE thing that, if done, would make today feel like progress. Put everything else in a 'later' list. Work on that one thing for 25 minutes."
  },
  distracted: {
    grounding: "Your attention is fractured because you're context-switching across too many inputs. Discord, Twitter, Telegram, GitHub notifications — each one pulls you out of deep work. You're not broken. Your environment is designed to interrupt you.",
    breathing: "Take 3 slow breaths. On each exhale, close one browser tab mentally. Imagine clearing your workspace. This signals your brain you're entering focus mode.",
    microAction: "Close all communication apps for 1 hour. Put your phone face-down or in another room. Open ONE file or task. Set a 25-minute timer. No exceptions. The world will not burn down in 25 minutes."
  },
  anxious: {
    grounding: "Anxiety is your brain running disaster simulations on loop. Most of what you're worried about either won't happen or is outside your control right now. You're safe in this moment. Outcomes are uncertain — that's normal, not catastrophic.",
    breathing: "4-7-8 breathing: Inhale through nose for 4, hold for 7, exhale through mouth for 8. Do this 3 times. This activates your parasympathetic nervous system and interrupts the anxiety loop.",
    microAction: "Write down your biggest worry right now. Under it, write: 'What's one small thing I can control in the next hour?' Do that thing. Action dissolves anxiety better than thinking does."
  },
  'low-motivation': {
    grounding: "Motivation doesn't create action — action creates motivation. You're waiting for a feeling that only comes after you start. Low motivation isn't laziness. It's your brain protecting you from potential failure by keeping you stuck. Start ugly. Momentum follows movement.",
    breathing: "Take 3 energizing breaths: Quick inhale through the nose, long exhale through the mouth. Think of it like blowing out birthday candles. This wakes up your system.",
    microAction: "Set a timer for 5 minutes. Work on the smallest, easiest part of your task — not the whole thing. Just 5 minutes. You can do anything for 5 minutes. Usually, you'll keep going after the timer ends."
  },
  comparing: {
    grounding: "You're comparing your Chapter 3 to someone else's Chapter 20. Their highlight reel vs. your behind-the-scenes. You don't see their struggles, pivots, or failures — only their wins. Your timeline is yours. You're not behind. You're exactly where you need to be.",
    breathing: "Take 3 grounding breaths. On each exhale, mentally release one comparison: 'Their success is not my failure.' This isn't about positive thinking — it's about redirecting focus to what you can control.",
    microAction: "Open a blank doc. Write down 3 things you've built, learned, or survived in the past month — no matter how small. Progress is invisible when you're looking at everyone else. Your work matters even if it's not viral."
  }
};

let currentStep = 1;
let currentFeeling = null;

function loadReset(feeling) {
  currentFeeling = feeling;
  currentStep = 1;
  
  // Get content
  const content = resetContent[feeling];
  
  // Populate content
  document.getElementById('groundingText').textContent = content.grounding;
  document.getElementById('breathingText').textContent = content.breathing;
  document.getElementById('microActionText').textContent = content.microAction;
  
  // Hide selection, show reset
  document.getElementById('selectionScreen').classList.add('hidden');
  document.getElementById('resetScreen').classList.remove('hidden');
  
  // Show first step
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.add('hidden');
  
  // Reset progress
  updateProgress(1);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(step) {
  currentStep = step;
  
  // Hide all steps
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.add('hidden');
  
  // Show current step
  document.getElementById(`step${step}`).classList.remove('hidden');
  
  // Update progress
  updateProgress(step);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // If breathing step, start breathing guide
  if (step === 2) {
    startBreathingGuide();
  }
}

function updateProgress(step) {
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const progressTime = document.getElementById('progressTime');
  
  const progress = {
    1: { width: '33%', label: 'Step 1 of 3', time: '~2 min' },
    2: { width: '66%', label: 'Step 2 of 3', time: '~1 min' },
    3: { width: '100%', label: 'Step 3 of 3', time: 'Almost done' }
  };
  
  progressBar.style.width = progress[step].width;
  progressLabel.textContent = progress[step].label;
  progressTime.textContent = progress[step].time;
}

function startBreathingGuide() {
  const instruction = document.getElementById('breathingInstruction');
  const phases = ['Breathe in...', 'Hold...', 'Breathe out...', 'Hold...'];
  const durations = [4000, 4000, 6000, 2000]; // milliseconds
  
  let currentPhase = 0;
  
  function cycleBreathing() {
    instruction.textContent = phases[currentPhase];
    
    setTimeout(() => {
      currentPhase = (currentPhase + 1) % phases.length;
      cycleBreathing();
    }, durations[currentPhase]);
  }
  
  cycleBreathing();
}

function restart() {
  currentStep = 1;
  currentFeeling = null;
  
  // Show selection, hide reset
  document.getElementById('selectionScreen').classList.remove('hidden');
  document.getElementById('resetScreen').classList.add('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}