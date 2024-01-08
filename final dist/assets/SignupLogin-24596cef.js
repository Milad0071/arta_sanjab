import{V as Z,a as L,b as x}from"./axios-a01a6b08.js";import{p as $,m as G,o as Q,g as W,u as X,a as Y,b as ee,c as g,r as P,d as te,w as D,e as ne,f as se,h as a,F as ae,i as F,V as oe,j as N,n as ie,_ as le,k as y,l as re,q as h,s as ue,t as f,v as b,x as A,y as B,z as I,A as T,B as de,C as ce}from"./index-f37c92ad.js";import{V as E}from"./VCard-48656466.js";import{m as fe,V as me,a as ve}from"./VTextField-a93b5d17.js";import{V as he}from"./VDialog-d83bc993.js";import{m as ge,u as pe}from"./VInput-b564c61d.js";const _e=$({autofocus:Boolean,divider:String,focusAll:Boolean,label:{type:String,default:"$vuetify.input.otp"},length:{type:[Number,String],default:6},modelValue:{type:[Number,String],default:void 0},placeholder:String,type:{type:String,default:"number"},...G(),...ge(),...Q(fe({variant:"outlined"}),["baseColor","bgColor","class","color","disabled","error","loading","rounded","style","theme","variant"])},"VOtpInput"),ye=W()({name:"VOtpInput",props:_e(),emits:{finish:e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,n){let{attrs:o,emit:r,slots:t}=n;const{dimensionStyles:p}=X(e),{isFocused:l,focus:O,blur:R}=pe(e),m=Y(e,"modelValue","",s=>String(s).split(""),s=>s.join("")),{t:z}=ee(),V=g(()=>Number(e.length)),j=g(()=>Array(V.value).fill(0)),v=P(-1),C=P(),_=P([]),S=g(()=>_.value[v.value]);function q(){if(e.type==="number"&&/[^0-9]/g.test(S.value.value)){S.value.value="";return}const s=m.value.slice(),i=S.value.value;s[v.value]=i;let u=null;v.value>m.value.length?u=m.value.length+1:v.value+1!==V.value&&(u="next"),m.value=s,u&&N(C.value,u)}function K(s){const i=m.value.slice(),u=v.value;let d=null;["ArrowLeft","ArrowRight","Backspace","Delete"].includes(s.key)&&(s.preventDefault(),s.key==="ArrowLeft"?d="prev":s.key==="ArrowRight"?d="next":["Backspace","Delete"].includes(s.key)&&(i[v.value]="",m.value=i,v.value>0&&s.key==="Backspace"?d="prev":requestAnimationFrame(()=>{var c;(c=_.value[u])==null||c.select()})),requestAnimationFrame(()=>{d!=null&&N(C.value,d)}))}function U(s,i){var u,d;i.preventDefault(),i.stopPropagation(),m.value=(((u=i==null?void 0:i.clipboardData)==null?void 0:u.getData("Text"))??"").split(""),(d=_.value)==null||d[s].blur()}function J(){m.value=[]}function H(s,i){O(),v.value=i}function M(){R(),v.value=-1}return te({VField:{color:g(()=>e.color),bgColor:g(()=>e.color),baseColor:g(()=>e.baseColor),disabled:g(()=>e.disabled),error:g(()=>e.error),variant:g(()=>e.variant)}},{scoped:!0}),D(m,s=>{s.length===V.value&&r("finish",s.join(""))},{deep:!0}),D(v,s=>{s<0||ie(()=>{var i;(i=_.value[s])==null||i.select()})}),ne(()=>{var u;const[s,i]=se(o);return a("div",F({class:["v-otp-input",{"v-otp-input--divided":!!e.divider},e.class],style:[e.style]},s),[a("div",{ref:C,class:"v-otp-input__content",style:[p.value]},[j.value.map((d,c)=>a(ae,null,[e.divider&&c!==0&&a("span",{class:"v-otp-input__divider"},[e.divider]),a(me,{focused:l.value&&e.focusAll||v.value===c,key:c},{...t,default:()=>a("input",{ref:k=>_.value[c]=k,"aria-label":z(e.label,c+1),autofocus:c===0&&e.autofocus,autocomplete:"one-time-code",class:["v-otp-input__field"],disabled:e.disabled,inputmode:e.type==="number"?"numeric":"text",min:e.type==="number"?0:void 0,maxlength:"1",placeholder:e.placeholder,type:e.type==="number"?"text":e.type,value:m.value[c],onInput:q,onFocus:k=>H(k,c),onBlur:M,onKeydown:K,onPaste:k=>U(c,k)},null)})])),a("input",F({class:"v-otp-input-input",type:"hidden"},i,{value:m.value.join("")}),null),a(oe,{contained:!0,"content-class":"v-otp-input__loader","model-value":!!e.loading,persistent:!0},{default:()=>{var d;return[((d=t.loader)==null?void 0:d.call(t))??a(Z,{color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0,size:"24",width:"2"},null)]}}),(u=t.default)==null?void 0:u.call(t)])])}),{blur:()=>{var s;(s=_.value)==null||s.some(i=>i.blur())},focus:()=>{var s;(s=_.value)==null||s[0].focus()},reset:J,isFocused:l}}}),be={emits:["reset-app"],data(){return{timer:60,userPhoneNum:"",otp:"",sendAgin:!1,startCountDown:!1,phoneBtnLoading:!1,verificationBtnLoading:!1,userPhoneNumError:!1,dialog:!1}},mounted(){},watch:{userPhoneNum(e){this.userPhoneNum=this.toFarsiNumber(e),e.length>0&&(this.userPhoneNumError=!1)}},methods:{stopChars(e){e.key.match(/^[a-zA-Z]*$/)&&e.key!="Backspace"&&e.preventDefault()},toFarsiNumber(e){if(e.length!=0){e=e.toString();for(var n=["1","2","3","4","5","6","7","8","9","0"],o=["۱","۲","۳","۴","۵","۶","۷","۸","۹","۰"],r=0,t=n.length;r<t;r++)e=e.replace(new RegExp(n[r],"g"),o[r]);return e}},toEngNumber(e){if(e.length!=0){e=e.toString();for(var n=["1","2","3","4","5","6","7","8","9","0"],o=["۱","۲","۳","۴","۵","۶","۷","۸","۹","۰"],r=0,t=n.length;r<t;r++)e=e.replace(new RegExp(o[r],"g"),n[r]);return e}},goToAdminForm(){this.$swal("در دست توسعه","","info")},emptyCheck(e){return(e==null||e=="")&&(this.userPhoneNumError=!0),!(e==null||e=="")},logninFunc(e){if(this.phoneBtnLoading=!0,this.sendAgin=!1,e=this.toEngNumber(e),this.emptyCheck(e)===!0){var n=new FormData;JSON.stringify(n.append("phone_number",e)),L({method:"POST",url:"http://194.9.56.86/api/v1/account/login-register/",headers:{"Content-Type":"application/json"},data:n}).then(o=>{o.status==200?(console.log(o),this.startCountDown=!0,this.countDownTimer(),this.$cookies.set("sessionId",o.data),this.phoneBtnLoading=!1,this.dialog=!0):(this.$swal("مشکلی پیش آمد!"),this.phoneBtnLoading=!1)}).catch(o=>{console.log(o),this.$swal("مشکلی پیش آمد!",o.message,"error"),this.phoneBtnLoading=!1})}},countDownTimer(){this.timer>0?setTimeout(()=>{this.timer-=1,this.countDownTimer()},1e3):(this.startCountDown=!1,this.sendAgin=!0)},validateCode(e){this.verificationBtnLoading=!0;var n=new FormData;JSON.stringify(n.append("code",e)),L({method:"POST",url:`http://194.9.56.86/api/v1/account/phone-verification/?session=${this.$cookies.get("sessionId")}`,headers:{"content-type":"application/json"},data:n}).then(o=>{o.status==201?(this.$cookies.set("userToken",o.data.access),this.$cookies.set("userEntered",!0),this.$cookies.set("showBars"),this.$emit("reset-app"),this.$router.push({name:"Home"}),this.dialog=!1,this.verificationBtnLoading=!1):o.status==200?(this.dialog=!1,this.verificationBtnLoading=!1,this.$cookies.set("showBars"),this.$router.push({name:"ParentsDetails"})):(this.$swal("مشکلی پیش آمد، لطفا مجدد تلاش نمایید!","error"),this.verificationBtnLoading=!1)}).catch(o=>{this.$swal("مشکلی پیش آمد!",o.message,"error"),this.verificationBtnLoading=!1})}}},w=e=>(de("data-v-b572c4b7"),e=e(),ce(),e),ke={class:"mainBody"},xe={class:"mainLogSignBody"},Be=w(()=>f("div",{class:"titlePart"},[f("div",{class:"titleShape"}),f("h2",null,"ورود/ثبت‌نام کاربران")],-1)),we={class:"mainBox flex_class"},Ve={class:"flex_column_class"},Ce={class:"input_part"},Se=w(()=>f("p",{class:"loginText"},"برای ورود یا ثبت‌نام، لطفا شماره تلفن همراه خود را وارد نمایید:",-1)),Pe={key:0,style:{color:"red","font-weight":"fold"}},Le={class:"btnContainer flex_class"},De=w(()=>f("h3",{class:"text-h6 mb-2",style:{"font-family":"iranSansRegular !important"}}," لطفا کد ارسالی به شماره همراه خود را در کادر زیر وارد نمایید: ",-1)),Fe={key:0,class:"timerClass flex_class"},Ne=w(()=>f("p",null,"ارسال مجدد پیامک:",-1)),Ae={key:0,class:"flex_class mr-1"},Ie={key:1,class:"flex_class mr-1"},Te={key:1,class:"flex_class"},Ee={key:2,class:"flex_class"};function Oe(e,n,o,r,t,p){return y(),re(ue,{style:{height:"100% !important","font-family":"iranSansRegular !important"}},{default:h(()=>[a(I,{rtl:""},{default:h(()=>[f("div",ke,[f("div",xe,[a(E,{class:"loginPartContainer"},{default:h(()=>[Be,f("div",we,[f("div",Ve,[f("div",Ce,[Se,a(ve,{label:"تلفن همراه",class:"ltrClass input_1",reverse:"",onKeydown:n[0]||(n[0]=l=>p.stopChars(l)),variant:"plain",placeholder:"شماره تلفن همراه خود را وارد کنید",modelValue:t.userPhoneNum,"onUpdate:modelValue":n[1]||(n[1]=l=>t.userPhoneNum=l)},null,8,["modelValue"]),t.userPhoneNumError==!0?(y(),b("p",Pe," لطفا شماره تلفن را درست وارد کنید! ")):A("",!0)]),f("div",Le,[a(x,{loading:t.phoneBtnLoading,color:"#525355",class:"text-none childBtn",size:"large","min-width":"200",variant:"outlined",onClick:n[2]||(n[2]=l=>p.logninFunc(t.userPhoneNum))},{default:h(()=>[B(" ورود/ثبت‌نام ")]),_:1},8,["loading"])])])])]),_:1})]),a(he,{modelValue:t.dialog,"onUpdate:modelValue":n[7]||(n[7]=l=>t.dialog=l),style:{width:"35% !important"}},{default:h(()=>[a(E,{class:"py-12 px-8 text-center mx-auto ma-4",style:{"font-family":"iranSansRegular !important"},width:"100%"},{default:h(()=>[De,a(I,{ltr:""},{default:h(()=>[a(ye,{modelValue:t.otp,"onUpdate:modelValue":n[3]||(n[3]=l=>t.otp=l),reverse:"",variant:"plain",color:"#f68100",length:"4"},null,8,["modelValue"])]),_:1}),t.startCountDown==!0?(y(),b("div",Fe,[Ne,t.timer>9?(y(),b("div",Ae,"00:"+T(t.timer),1)):(y(),b("div",Ie,"00:0"+T(t.timer),1))])):A("",!0),t.sendAgin==!1?(y(),b("div",Te,[a(x,{loading:t.verificationBtnLoading,color:"#f68100",class:"text-none childBtn",size:"large","min-width":"200",variant:"outlined",onClick:n[4]||(n[4]=l=>p.validateCode(t.otp))},{default:h(()=>[B(" ارسال کد ")]),_:1},8,["loading"])])):(y(),b("div",Ee,[a(x,{loading:t.verificationBtnLoading,color:"#f68100",class:"text-none childBtn",size:"large","min-width":"200",variant:"outlined",onClick:n[5]||(n[5]=l=>p.validateCode(t.otp))},{default:h(()=>[B(" ارسال کد ")]),_:1},8,["loading"]),a(x,{loading:t.verificationBtnLoading,color:"#f68100",class:"text-none sendAgainBtn",size:"large","min-width":"200",variant:"outlined",onClick:n[6]||(n[6]=l=>p.logninFunc(t.userPhoneNum))},{default:h(()=>[B(" ارسال مجدد پیامک ")]),_:1},8,["loading"])]))]),_:1})]),_:1},8,["modelValue"])])]),_:1})]),_:1})}const Je=le(be,[["render",Oe],["__scopeId","data-v-b572c4b7"]]);export{Je as default};
