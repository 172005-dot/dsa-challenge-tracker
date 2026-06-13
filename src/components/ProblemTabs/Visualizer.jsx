// src/components/ProblemTabs/Visualizer.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Terminal } from 'lucide-react';

function generatePascalSteps(n) {
  const steps = []; const tri = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c <= r; c++) {
      if (c === 0 || c === r) { row.push(1); steps.push({ triangle: tri.map(x=>[...x]), currentRow: r, currentCol: c, description: `Row ${r}, Col ${c}: edge cell = 1`, hl: 6 }); }
      else { const v = tri[r-1][c-1]+tri[r-1][c]; row.push(v); steps.push({ triangle: tri.map(x=>[...x]), currentRow: r, currentCol: c, description: `Row ${r}, Col ${c}: ${tri[r-1][c-1]}+${tri[r-1][c]}=${v}`, hl: 8 }); }
    }
    tri.push(row);
    steps.push({ triangle: tri.map(x=>[...x]), currentRow: r, currentCol: -1, description: `Row ${r} complete: [${row.join(', ')}]`, hl: 10 });
  }
  return steps;
}

function generateKadaneSteps(arr) {
  const steps = []; let mx = arr[0], cur = arr[0];
  steps.push({ arr, i:0, cur, mx, description:`Init: currSum=maxSum=${arr[0]}`, hl:3 });
  for (let i=1;i<arr.length;i++) {
    const pc=cur; cur=Math.max(arr[i],cur+arr[i]);
    steps.push({ arr, i, cur, mx, description:`i=${i}: max(${arr[i]}, ${pc}+${arr[i]}=${pc+arr[i]}) → currSum=${cur}`, hl:6 });
    if(cur>mx){mx=cur; steps.push({ arr, i, cur, mx, description:`currSum(${cur})>maxSum → update maxSum=${mx}`, hl:7 });}
  }
  steps.push({ arr, i:arr.length-1, cur, mx, description:`Done! Max Subarray Sum = ${mx}`, hl:9 });
  return steps;
}

function generateNextPermSteps(arr) {
  const steps=[]; const a=[...arr];
  steps.push({arr:[...a],i:-1,j:-1,phase:'start',description:'Find rightmost element smaller than its next',hl:2});
  let i=a.length-2;
  while(i>=0&&a[i]>=a[i+1])i--;
  if(i<0){steps.push({arr:[...a],i,j:-1,phase:'reverse',description:'Array descending → reverse entire array',hl:4});a.reverse();steps.push({arr:[...a],i,j:-1,phase:'done',description:`Result: [${a.join(', ')}]`,hl:5});return steps;}
  steps.push({arr:[...a],i,j:-1,phase:'found-i',description:`Pivot at index ${i}: arr[${i}]=${a[i]} < arr[${i+1}]=${a[i+1]}`,hl:3});
  let j=a.length-1; while(a[j]<=a[i])j--;
  steps.push({arr:[...a],i,j,phase:'found-j',description:`Found index ${j} from right with value ${a[j]} > arr[${i}]=${a[i]}`,hl:6});
  [a[i],a[j]]=[a[j],a[i]];
  steps.push({arr:[...a],i,j,phase:'swapped',description:`Swapped indices ${i} and ${j}: [${a.join(', ')}]`,hl:7});
  let l=i+1,r=a.length-1;
  while(l<r){[a[l],a[r]]=[a[r],a[l]];steps.push({arr:[...a],i,j,k:l,phase:'reversing',description:`Reverse suffix: swap positions ${l} ↔ ${r}`,hl:9});l++;r--;}
  steps.push({arr:[...a],i,j:-1,phase:'done',description:`Next Permutation: [${a.join(', ')}]`,hl:10});
  return steps;
}

function generateTwoSumSteps(arr,target) {
  const steps=[]; const map={};
  steps.push({arr,map:{},i:-1,found:null,description:`HashMap approach. Target=${target}`,hl:2});
  for(let i=0;i<arr.length;i++){
    const comp=target-arr[i];
    steps.push({arr,map:{...map},i,found:null,comp,description:`i=${i}: arr[i]=${arr[i]}, need ${comp}. Check map...`,hl:5});
    if(map[comp]!==undefined){steps.push({arr,map:{...map},i,found:[map[comp],i],comp,description:`Found! indices [${map[comp]}, ${i}] → ${arr[map[comp]]}+${arr[i]}=${target}`,hl:6});return steps;}
    map[arr[i]]=i;
    steps.push({arr,map:{...map},i,found:null,description:`Not found. Store map[${arr[i]}]=${i}`,hl:8});
  }
  return steps;
}

function generateBinarySearchSteps(arr,target) {
  const steps=[]; let lo=0,hi=arr.length-1;
  steps.push({arr,lo,hi,mid:-1,found:-1,description:`lo=0, hi=${hi}. Search target=${target}`,hl:2});
  while(lo<=hi){
    const mid=Math.floor((lo+hi)/2);
    steps.push({arr,lo,hi,mid,found:-1,description:`lo=${lo}, hi=${hi}, mid=${mid}, arr[mid]=${arr[mid]}`,hl:4});
    if(arr[mid]===target){steps.push({arr,lo,hi,mid,found:mid,description:`arr[${mid}]=${arr[mid]} = target! Found at index ${mid}`,hl:5});return steps;}
    else if(arr[mid]<target){lo=mid+1;steps.push({arr,lo,hi,mid,found:-1,description:`arr[mid]<target → lo=${lo}`,hl:7});}
    else{hi=mid-1;steps.push({arr,lo,hi,mid,found:-1,description:`arr[mid]>target → hi=${hi}`,hl:9});}
  }
  steps.push({arr,lo,hi,mid:-1,found:-1,description:`target=${target} not found`,hl:11});
  return steps;
}

function generateSortColorsSteps(arr) {
  const steps=[]; const a=[...arr]; let lo=0,mid=0,hi=a.length-1;
  steps.push({arr:[...a],lo,mid,hi,description:`Dutch National Flag: lo=0, mid=0, hi=${hi}`,hl:2});
  while(mid<=hi){
    if(a[mid]===0){[a[lo],a[mid]]=[a[mid],a[lo]];steps.push({arr:[...a],lo,mid,hi,description:`a[mid]=0: swap with lo(${lo}). lo++,mid++`,hl:5});lo++;mid++;}
    else if(a[mid]===1){steps.push({arr:[...a],lo,mid,hi,description:`a[mid]=1: in place. mid++`,hl:8});mid++;}
    else{[a[mid],a[hi]]=[a[hi],a[mid]];steps.push({arr:[...a],lo,mid,hi,description:`a[mid]=2: swap with hi(${hi}). hi--`,hl:11});hi--;}
  }
  steps.push({arr:[...a],lo,mid,hi,description:`Sorted! [${a.join(', ')}]`,hl:13});
  return steps;
}

function generateMergeSortSteps(arr) {
  const steps=[]; const a=[...arr];
  steps.push({arr:[...a],left:-1,right:-1,merging:[],description:`Start MergeSort on [${a.join(', ')}]`,hl:2});
  function ms(array,l,r){
    if(l>=r)return;
    const m=Math.floor((l+r)/2);
    steps.push({arr:[...array],left:l,right:r,mid:m,merging:[],description:`Divide [${l}..${r}] → [${l}..${m}] and [${m+1}..${r}]`,hl:4});
    ms(array,l,m); ms(array,m+1,r);
    const L=array.slice(l,m+1),R=array.slice(m+1,r+1);
    let i=0,j=0,k=l;
    while(i<L.length&&j<R.length){
      if(L[i]<=R[j])array[k++]=L[i++]; else array[k++]=R[j++];
      steps.push({arr:[...array],left:l,right:r,merging:Array.from({length:r-l+1},(_,x)=>l+x),description:`Merging [${l}..${r}]: placed ${array[k-1]} at [${k-1}]`,hl:8});
    }
    while(i<L.length)array[k++]=L[i++]; while(j<R.length)array[k++]=R[j++];
    steps.push({arr:[...array],left:l,right:r,merging:[],description:`Merged [${l}..${r}]: [${array.slice(l,r+1).join(', ')}]`,hl:10});
  }
  ms(a,0,a.length-1);
  steps.push({arr:[...a],left:-1,right:-1,merging:[],description:`Done! [${a.join(', ')}]`,hl:12});
  return steps;
}

function generateLinkedListSteps(nodes) {
  const steps=[]; 
  steps.push({nodes,curr:0,prev:-1,description:`Reverse LL. curr=head(${nodes[0]}), prev=null`,hl:2});
  let prev=-1,curr=0;
  while(curr<nodes.length){
    steps.push({nodes,curr,prev,description:`curr=${nodes[curr]}: point curr.next → ${prev>=0?nodes[prev]:'null'}`,hl:5});
    prev=curr; curr++;
  }
  steps.push({nodes:[...nodes].reverse(),curr:-1,prev,description:`Reversed: ${[...nodes].reverse().join(' → ')} → null`,hl:8});
  return steps;
}

function generateDPSteps(n) {
  const steps=[]; const dp=new Array(n+1).fill(0);
  dp[0]=0;dp[1]=1;
  steps.push({dp:[...dp],i:1,description:`Base: dp[0]=0, dp[1]=1`,hl:3});
  for(let i=2;i<=n;i++){dp[i]=dp[i-1]+dp[i-2];steps.push({dp:[...dp],i,description:`dp[${i}]=dp[${i-1}](${dp[i-1]})+dp[${i-2}](${dp[i-2]})=${dp[i]}`,hl:6});}
  steps.push({dp:[...dp],i:n,description:`Fibonacci(${n})=${dp[n]}`,hl:8});
  return steps;
}

function generateStackSteps(ops) {
  const steps=[]; let stack=[];
  steps.push({stack:[],op:'init',val:null,description:`Stack initialized. Ops: ${ops.join(', ')}`,hl:1});
  for(const op of ops){
    const p=op.trim().split(' ');
    if(p[0]==='push'){const v=parseInt(p[1]);stack=[...stack,v];steps.push({stack:[...stack],op:'push',val:v,description:`PUSH ${v} → Stack: [${stack.join(', ')}]`,hl:4});}
    else if(p[0]==='pop'){const popped=stack[stack.length-1];stack=stack.slice(0,-1);steps.push({stack:[...stack],op:'pop',val:popped,description:`POP ${popped} → Stack: [${stack.join(', ')}]`,hl:7});}
  }
  return steps;
}

const CODES = {
  pascal:['List<List<Integer>> generate(int n) {','  List<List<Integer>> res = new ArrayList<>();','  for (int r = 0; r < n; r++) {','    List<Integer> row = new ArrayList<>();','    for (int c = 0; c <= r; c++) {','      if (c==0||c==r) row.add(1);','      else','        row.add(res.get(r-1).get(c-1)+res.get(r-1).get(c));','    }','    res.add(row);','  }','  return res;','}'],
  kadane:['int maxSubArray(int[] nums) {','  int cur=nums[0], mx=nums[0];','  // init currSum and maxSum','  for (int i=1; i<nums.length; i++) {','    // extend or restart subarray','    cur = Math.max(nums[i], cur+nums[i]);','    mx  = Math.max(mx, cur);','  }','  return mx;','}'],
  'next-permutation':['void nextPermutation(int[] a) {','  int i = a.length-2;','  while(i>=0 && a[i]>=a[i+1]) i--;','  if(i<0){reverse(a,0,a.length-1);return;}','  // found pivot','  int j=a.length-1;','  while(a[j]<=a[i]) j--;','  swap(a,i,j);','  // reverse suffix','  reverse(a,i+1,a.length-1);','}'],
  'two-sum':['int[] twoSum(int[] nums, int target) {','  Map<Integer,Integer> map=new HashMap<>();','  for(int i=0;i<nums.length;i++){','    int comp=target-nums[i];','    if(map.containsKey(comp))','      return new int[]{map.get(comp),i};','    // store current','    map.put(nums[i],i);','  }','  return new int[]{};','}'],
  'binary-search':['int search(int[] nums, int target) {','  int lo=0, hi=nums.length-1;','  while(lo<=hi){','    int mid=lo+(hi-lo)/2;','    if(nums[mid]==target) return mid;','    // target in right half','    else if(nums[mid]<target) lo=mid+1;','    // target in left half','    else hi=mid-1;','  }','  return -1;','}'],
  'sort-colors':['void sortColors(int[] a){','  int lo=0,mid=0,hi=a.length-1;','  while(mid<=hi){','    if(a[mid]==0){','      swap(a,lo++,mid++);','    }','    else if(a[mid]==1){','      mid++;','    }','    else{','      swap(a,mid,hi--);','    }','  }','}'],
  'merge-sort':['void mergeSort(int[] a,int l,int r){','  if(l>=r) return;','  int m=(l+r)/2;','  mergeSort(a,l,m);','  mergeSort(a,m+1,r);','  merge(a,l,m,r);','}','void merge(int[] a,int l,int m,int r){','  // copy halves, merge smaller first','  // place back into original array','  // segment complete','}'],
  'linked-list':['ListNode reverse(ListNode head){','  ListNode prev=null, curr=head;','  while(curr!=null){','    ListNode next=curr.next;','    curr.next=prev;','    prev=curr;','    curr=next;','  }','  return prev;','}'],
  dp:['int fib(int n){','  if(n<=1) return n;','  int[] dp=new int[n+1];','  dp[0]=0; dp[1]=1;','  for(int i=2;i<=n;i++){','    // each = sum of previous two','    dp[i]=dp[i-1]+dp[i-2];','  }','  return dp[n];','}'],
  'stack-queue':['Stack<Integer> stack=new Stack<>();','','// PUSH','void push(int val){','  stack.push(val);','}','// POP','int pop(){','  return stack.pop();','}'],
};
export default function Visualizer({ problem }) {
  const type = problem?.visualizerType || 'kadane';
  const [pascalRows, setPascalRows] = useState(5);
  const [kadaneInput, setKadaneInput] = useState('-2,1,-3,4,-1,2,1,-5,4');
  const [nextPermInput, setNextPermInput] = useState('1,2,3');
  const [twoSumArr, setTwoSumArr] = useState('2,7,11,15');
  const [twoSumTarget, setTwoSumTarget] = useState(9);
  const [bsArr, setBsArr] = useState('1,3,5,7,9,11,13');
  const [bsTarget, setBsTarget] = useState(7);
  const [scInput, setScInput] = useState('2,0,2,1,1,0');
  const [msInput, setMsInput] = useState('5,3,8,1,4');
  const [llInput, setLlInput] = useState('1,2,3,4,5');
  const [dpN, setDpN] = useState(6);
  const [stackOps, setStackOps] = useState('push 5,push 3,push 8,pop,push 1');
  const [steps, setSteps] = useState([]);
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const ref = useRef(null);

  const build = useCallback(() => {
    let s = [];
    try {
      if (type==='pascal') s=generatePascalSteps(Math.max(1,Math.min(8,pascalRows)));
      else if (type==='kadane') s=generateKadaneSteps(kadaneInput.split(',').map(Number).filter(n=>!isNaN(n)));
      else if (type==='next-permutation') s=generateNextPermSteps(nextPermInput.split(',').map(Number).filter(n=>!isNaN(n)));
      else if (type==='two-sum') s=generateTwoSumSteps(twoSumArr.split(',').map(Number).filter(n=>!isNaN(n)),twoSumTarget);
      else if (type==='binary-search') s=generateBinarySearchSteps(bsArr.split(',').map(Number).filter(n=>!isNaN(n)).sort((a,b)=>a-b),bsTarget);
      else if (type==='sort-colors') s=generateSortColorsSteps(scInput.split(',').map(Number).filter(n=>[0,1,2].includes(Number(n))));
      else if (type==='merge-sort') s=generateMergeSortSteps(msInput.split(',').map(Number).filter(n=>!isNaN(n)));
      else if (type==='linked-list') s=generateLinkedListSteps(llInput.split(',').map(Number).filter(n=>!isNaN(n)));
      else if (type==='dp') s=generateDPSteps(Math.max(2,Math.min(10,dpN)));
      else if (type==='stack-queue') s=generateStackSteps(stackOps.split(','));
      else s=generateKadaneSteps([-2,1,-3,4,-1,2,1,-5,4]);
    } catch { s=[{description:'Invalid input.',hl:-1}]; }
    if(!s.length) s=[{description:'No steps.',hl:-1}];
    setSteps(s); setCur(0); setPlaying(false);
  }, [type,pascalRows,kadaneInput,nextPermInput,twoSumArr,twoSumTarget,bsArr,bsTarget,scInput,msInput,llInput,dpN,stackOps]);

  useEffect(()=>{build();},[build]);

  useEffect(()=>{
    if(playing){ref.current=setInterval(()=>{setCur(s=>{if(s>=steps.length-1){setPlaying(false);return s;}return s+1;});},speed);}
    return ()=>clearInterval(ref.current);
  },[playing,speed,steps.length]);

  const st = steps[cur] || {};
  const hl = st.hl || -1;
  const lines = CODES[type] || CODES['kadane'];

  const renderCanvas = () => {
    if (type==='pascal') {
      const tri = st.triangle || [];
      return (
        <div className="flex flex-col items-center gap-2 py-4 w-full">
          {tri.map((row,r)=>(
            <div key={r} className="flex gap-2">
              {row.map((val,c)=>{
                const isActive=st.currentRow===r&&st.currentCol===c;
                const isRow=st.currentRow===r;
                return <motion.div key={c} initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${isActive?'border-pink-500 bg-pink-500/20 text-pink-300 scale-110':isRow?'border-purple-500/60 bg-purple-500/10 text-purple-300':'border-slate-700 bg-slate-900/60 text-slate-400'}`}>{val}</motion.div>;
              })}
            </div>
          ))}
          {tri.length===0&&<span className="text-slate-500 text-xs">Building...</span>}
        </div>
      );
    }
    if (type==='kadane') {
      const arr=st.arr||[]; const i=st.i??-1;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${idx===i?'border-pink-500 bg-pink-500/20 text-pink-300 scale-110':idx<i?'border-purple-500/40 bg-purple-500/10 text-purple-300':'border-slate-700 bg-slate-900/60 text-slate-400'}`}>{v}</div>
                <span className="text-[9px] text-slate-600 font-mono">[{idx}]</span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 text-xs font-mono bg-slate-900/60 border border-slate-800 rounded-xl px-5 py-3">
            <div className="text-center"><div className="text-slate-500 text-[10px] mb-1">currSum</div><div className="text-purple-400 font-bold text-lg">{st.cur}</div></div>
            <div className="w-px bg-slate-800"/>
            <div className="text-center"><div className="text-slate-500 text-[10px] mb-1">maxSum</div><div className="text-emerald-400 font-bold text-lg">{st.mx}</div></div>
          </div>
        </div>
      );
    }
    if (type==='next-permutation') {
      const arr=st.arr||[]; const pi=st.i??-1; const pj=st.j??-1; const phase=st.phase||'';
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>{
              const isPivot=idx===pi,isSwap=idx===pj,isRev=phase==='reversing'&&idx>pi;
              return <div key={idx} className="flex flex-col items-center gap-1"><motion.div layout className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${isPivot?'border-yellow-400 bg-yellow-400/20 text-yellow-300':isSwap?'border-pink-500 bg-pink-500/20 text-pink-300':isRev?'border-blue-400 bg-blue-400/10 text-blue-300':'border-slate-700 bg-slate-900/60 text-slate-300'}`}>{v}</motion.div><span className="text-[9px] font-mono text-slate-600">{isPivot?'pivot':isSwap?'swap':idx}</span></div>;
            })}
          </div>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">■ pivot</span>
            <span className="px-2 py-1 rounded border border-pink-500/30 bg-pink-500/10 text-pink-400">■ swap</span>
            <span className="px-2 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">■ reverse</span>
          </div>
        </div>
      );
    }
    if (type==='two-sum') {
      const arr=st.arr||[]; const i=st.i??-1; const map=st.map||{}; const found=st.found;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${found&&found.includes(idx)?'border-emerald-400 bg-emerald-400/20 text-emerald-300 scale-110':idx===i?'border-pink-500 bg-pink-500/20 text-pink-300':'border-slate-700 bg-slate-900/60 text-slate-400'}`}>{v}</div>
                <span className="text-[9px] text-slate-600 font-mono">[{idx}]</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-left w-full max-w-xs">
            <div className="text-slate-500 text-[10px] mb-2">HashMap</div>
            {Object.keys(map).length===0?<span className="text-slate-600">{'{}'}</span>:Object.entries(map).map(([k,v])=>(
              <div key={k} className={`flex justify-between ${parseInt(k)===st.comp?'text-emerald-400 font-bold':'text-slate-400'}`}><span>{k}</span><span>→ idx {v}</span></div>
            ))}
          </div>
        </div>
      );
    }
    if (type==='binary-search') {
      const arr=st.arr||[]; const lo=st.lo??0; const hi=st.hi??arr.length-1; const mid=st.mid??-1; const found=st.found??-1;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${found===idx?'border-emerald-400 bg-emerald-400/20 text-emerald-300 scale-110':idx===mid?'border-yellow-400 bg-yellow-400/20 text-yellow-300':idx<lo||idx>hi?'border-slate-800 bg-slate-950 text-slate-600 opacity-40':'border-slate-700 bg-slate-900/60 text-slate-300'}`}>{v}</div>
                <span className={`text-[9px] font-mono ${idx===lo?'text-blue-400':idx===hi?'text-red-400':idx===mid?'text-yellow-400':'text-slate-700'}`}>{idx===lo&&idx===hi?'lo=hi':idx===lo?'lo':idx===hi?'hi':idx===mid?'mid':idx}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-[10px] font-mono">
            <span className="px-2 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">lo={lo}</span>
            <span className="px-2 py-1 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">mid={mid>=0?mid:'—'}</span>
            <span className="px-2 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400">hi={hi}</span>
          </div>
        </div>
      );
    }
    if (type==='sort-colors') {
      const arr=st.arr||[]; const lo=st.lo??0; const mid=st.mid??0; const hi=st.hi??arr.length-1;
      const cm={0:'border-red-400 bg-red-400/20 text-red-300',1:'border-slate-400 bg-slate-400/20 text-slate-200',2:'border-blue-400 bg-blue-400/20 text-blue-300'};
      const lb={0:'0(R)',1:'1(W)',2:'2(B)'};
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${cm[v]}`}>{lb[v]}</div>
                <span className={`text-[9px] font-mono ${idx===lo?'text-red-400':idx===mid?'text-purple-400':idx===hi?'text-blue-400':'text-slate-700'}`}>{idx===lo?'lo':idx===mid?'mid':idx===hi?'hi':idx}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type==='merge-sort') {
      const arr=st.arr||[]; const left=st.left??-1; const right=st.right??-1; const merging=st.merging||[];
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {arr.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${merging.includes(idx)?'border-pink-500 bg-pink-500/20 text-pink-300':idx>=left&&idx<=right?'border-purple-400 bg-purple-400/10 text-purple-300':'border-slate-700 bg-slate-900/60 text-slate-400'}`}>{v}</div>
                <span className="text-[9px] text-slate-600 font-mono">[{idx}]</span>
              </div>
            ))}
          </div>
          {left>=0&&<div className="text-[10px] font-mono text-slate-500">Segment: [{left}..{right}]</div>}
        </div>
      );
    }
    if (type==='linked-list') {
      const nodes=st.nodes||[]; const curr=st.curr??-1; const prev=st.prev??-1;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {nodes.map((v,idx)=>(
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${idx===curr?'border-pink-500 bg-pink-500/20 text-pink-300':idx===prev?'border-purple-400 bg-purple-400/10 text-purple-300':'border-slate-700 bg-slate-900/60 text-slate-400'}`}>{v}</div>
                  <span className="text-[9px] font-mono text-slate-600">{idx===curr?'curr':idx===prev?'prev':''}</span>
                </div>
                {idx<nodes.length-1&&<span className="text-slate-600 text-sm">→</span>}
              </React.Fragment>
            ))}
            <span className="text-slate-600 text-sm ml-1">→ null</span>
          </div>
        </div>
      );
    }
    if (type==='dp') {
      const dp=st.dp||[]; const i=st.i??-1;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          <div className="flex gap-2 flex-wrap justify-center">
            {dp.map((v,idx)=>(
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${idx===i?'border-pink-500 bg-pink-500/20 text-pink-300 scale-110':idx===i-1||idx===i-2?'border-purple-400 bg-purple-400/10 text-purple-300':v>0?'border-emerald-500/40 bg-emerald-500/10 text-emerald-300':'border-slate-700 bg-slate-900/60 text-slate-500'}`}>{v}</div>
                <span className="text-[9px] text-slate-600 font-mono">dp[{idx}]</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type==='stack-queue') {
      const stack=st.stack||[]; const op=st.op; const val=st.val;
      return (
        <div className="flex flex-col items-center gap-4 py-4 w-full">
          {op&&op!=='init'&&<div className={`text-xs font-bold px-3 py-1 rounded-full border ${op==='push'?'border-emerald-500/40 bg-emerald-500/10 text-emerald-400':'border-red-500/40 bg-red-500/10 text-red-400'}`}>{op==='push'?`PUSH ${val}`:`POP → ${val}`}</div>}
          <div className="flex flex-col-reverse items-center gap-1 min-h-[120px] justify-end border-x-2 border-b-2 border-slate-700 px-4 pb-2 rounded-b-xl w-28">
            {stack.length===0?<span className="text-[9px] text-slate-600 py-6">Empty</span>:stack.map((item,idx)=>(
              <motion.div key={idx} initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className={`w-full py-1.5 rounded text-center text-xs font-bold border ${idx===stack.length-1?'from-purple-500/20 to-pink-500/15 border-purple-400/40 text-purple-300 bg-gradient-to-r':'border-slate-700 bg-slate-800 text-slate-400'}`}>{item}</motion.div>
            ))}
          </div>
          <span className="text-[9px] text-slate-600 font-mono">↑ TOP</span>
        </div>
      );
    }
    return <div className="text-slate-500 text-xs py-8">Visualization coming soon for this type.</div>;
  };

  const renderInput = () => (
    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/60 space-y-2">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Your Input</span>
      {type==='pascal'&&<div className="flex items-center gap-3"><span className="text-xs text-slate-400">Rows (n):</span><input type="number" min={1} max={8} value={pascalRows} onChange={e=>setPascalRows(parseInt(e.target.value))} className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 outline-none w-16 text-center focus:border-purple-500 font-mono"/></div>}
      {type==='kadane'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Array:</span><input type="text" value={kadaneInput} onChange={e=>setKadaneInput(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      {type==='next-permutation'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Array:</span><input type="text" value={nextPermInput} onChange={e=>setNextPermInput(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      {type==='two-sum'&&<div className="flex gap-2"><div className="flex-1 flex flex-col gap-1"><span className="text-[10px] text-slate-500">Array:</span><input type="text" value={twoSumArr} onChange={e=>setTwoSumArr(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-purple-500 font-mono"/></div><div className="w-20 flex flex-col gap-1"><span className="text-[10px] text-slate-500">Target:</span><input type="number" value={twoSumTarget} onChange={e=>setTwoSumTarget(parseInt(e.target.value))} className="bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-200 outline-none text-center focus:border-purple-500 font-mono"/></div></div>}
      {type==='binary-search'&&<div className="flex gap-2"><div className="flex-1 flex flex-col gap-1"><span className="text-[10px] text-slate-500">Sorted Array:</span><input type="text" value={bsArr} onChange={e=>setBsArr(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-purple-500 font-mono"/></div><div className="w-20 flex flex-col gap-1"><span className="text-[10px] text-slate-500">Target:</span><input type="number" value={bsTarget} onChange={e=>setBsTarget(parseInt(e.target.value))} className="bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-200 outline-none text-center focus:border-purple-500 font-mono"/></div></div>}
      {type==='sort-colors'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Array of 0s,1s,2s:</span><input type="text" value={scInput} onChange={e=>setScInput(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      {type==='merge-sort'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Array to sort:</span><input type="text" value={msInput} onChange={e=>setMsInput(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      {type==='linked-list'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Node values:</span><input type="text" value={llInput} onChange={e=>setLlInput(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      {type==='dp'&&<div className="flex items-center gap-3"><span className="text-xs text-slate-400">Fibonacci n:</span><input type="number" min={2} max={10} value={dpN} onChange={e=>setDpN(parseInt(e.target.value))} className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 outline-none w-16 text-center focus:border-purple-500 font-mono"/></div>}
      {type==='stack-queue'&&<div className="flex flex-col gap-1"><span className="text-[10px] text-slate-500">Ops (push 5, pop, push 3):</span><input type="text" value={stackOps} onChange={e=>setStackOps(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none w-full focus:border-purple-500 font-mono"/></div>}
      <button onClick={build} className="mt-1 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 rounded-xl hover:scale-[1.01] transition-all">▶ Run Visualization</button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="glass-panel p-4 border border-slate-800 rounded-2xl flex flex-col space-y-4 h-full bg-slate-950/20">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 flex-wrap gap-2">
            <div><h4 className="text-xs font-extrabold text-slate-200 tracking-wider uppercase">Visualizer</h4><span className="text-[9px] text-slate-500 font-bold block mt-0.5">Step {cur+1} of {steps.length} · {type.toUpperCase()}</span></div>
            <div className="flex items-center gap-2"><span className="text-[9px] text-slate-500 font-bold uppercase font-mono">Speed</span><input type="range" min={300} max={2000} step={200} value={2300-speed} onChange={e=>setSpeed(2300-parseInt(e.target.value))} className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"/></div>
          </div>
          {renderInput()}
          <div className="flex-1 min-h-[220px] flex items-center justify-center p-4 bg-slate-950/70 border border-slate-900/80 rounded-2xl overflow-x-auto">
            <AnimatePresence mode="wait"><motion.div key={cur} initial={{opacity:0}} animate={{opacity:1}} className="w-full flex justify-center">{renderCanvas()}</motion.div></AnimatePresence>
          </div>
          <div className="bg-slate-950/50 border border-slate-900 p-3.5 rounded-xl text-left min-h-[56px] flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0 animate-pulse"/>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">{st.description||'...'}</p>
          </div>
          <div className="flex items-center justify-center gap-4 border-t border-slate-900/60 pt-3">
            <button onClick={()=>{setCur(0);setPlaying(false);}} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"><RotateCcw className="w-4 h-4"/></button>
            <button onClick={()=>setCur(s=>Math.max(0,s-1))} disabled={cur===0} className={`p-2 rounded-xl border transition-colors ${cur===0?'bg-slate-950 border-slate-900/40 text-slate-700 cursor-not-allowed':'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}><SkipBack className="w-4 h-4"/></button>
            <button onClick={()=>setPlaying(p=>!p)} className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 active:scale-95 transition-all shadow-md">{playing?<Pause className="w-4 h-4 fill-white"/>:<Play className="w-4 h-4 fill-white ml-0.5"/>}</button>
            <button onClick={()=>setCur(s=>Math.min(steps.length-1,s+1))} disabled={cur===steps.length-1} className={`p-2 rounded-xl border transition-colors ${cur===steps.length-1?'bg-slate-950 border-slate-900/40 text-slate-700 cursor-not-allowed':'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}><SkipForward className="w-4 h-4"/></button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="glass-panel p-4 border border-slate-800 rounded-2xl flex flex-col space-y-4 h-full bg-slate-950/20">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <h4 className="text-xs font-extrabold text-slate-200 tracking-wider uppercase flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-purple-400"/>Code Trace</h4>
            <span className="text-[9px] text-slate-500 font-bold bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">Java</span>
          </div>
          <p className="text-[10px] text-slate-500">Highlighted line = currently executing.</p>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-y-auto max-h-[400px] font-mono text-xs text-left leading-relaxed space-y-0.5">
            {lines.map((line,idx)=>{
              const ln=idx+1; const isActive=hl===ln;
              return <div key={ln} className={`flex items-start gap-3 py-1 px-2 rounded-lg transition-colors ${isActive?'bg-purple-500/20 border-l-2 border-purple-500 text-slate-100 font-bold':'hover:bg-slate-900/40 text-slate-400'}`}><span className="w-5 text-right text-slate-600 text-[10px] select-none shrink-0">{ln}</span><pre className="whitespace-pre font-mono text-[11px]">{line}</pre></div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}