/* eslint-disable require-jsdoc */
'use strict';


// Intended to put all method into single js file for simplicity.

// Class object for Step
class Step {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

class TinyTour {
  constructor(stepList) {
    // check if the param array stepList is an intance of Step
    // and have valid ids
    for (const elem of stepList) {
      if (!(elem instanceof Step)) {
        throw new Error('Please use Step Class to initilize the steps');
      } else {
        if (!(document.getElementById(elem.id))) {
          throw new Error('Please ensure all steps have valid target id');
        }
      }
    }
    // Current Step Index in List
    this.index =0;
    // Store Steps in an array from param stepList
    this.stepList = stepList;
    // Point to the current Step
    this.currentStep = stepList.at(this.index);

    // helper function for creating element with name,
    // attribute and value specified
    this.createElement = (name, attribute, value )=>{
      const elem = document.createElement(name);
      elem.setAttribute(attribute, value);
      return elem;
    };
    // helper function for appending child for target element for
    // illustration with an array
    this.appendChild = (target, ...list)=>{
      for (const elem of list) {
        target.appendChild(elem);
      }
      return target;
    };

    // helper function for getting the left,top,width,height of target element
    // for illustration
    const getElementPos = function(element) {
      let top = 0; let left = 0; let height =0; let width = 0;
      height = element.getBoundingClientRect().height;
      width= element.getBoundingClientRect().width;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
      return {
        top: top,
        left: left,
        height: height,
        width: width,
      };
    };

    // Render function for the Tour Box
    this.render = async ()=>{
      // Render the header, content, buttons
      this.target = document.getElementById(this.currentStep.id);
      this.header.innerHTML = this.currentStep.title;
      this.content.innerHTML = this.currentStep.content;
      this.nextBtn.textContent = this.index+2 >
                                 this.stepList.length? 'Done':'Next';
      this.prevBtn.textContent = this.index-1 <0 ?'End':'Back';

      // Positioning the tour box
      const targetPos = getElementPos(this.target);
      const tourViewPos = getElementPos(this.tourView);
      console.log('targetPos', targetPos);
      console.log('tourViewPos', tourViewPos);

      if (targetPos.top + tourViewPos.height + 10 > window.innerHeight ) {
        this.tourView.style.top = `${targetPos.top-tourViewPos.height-10}px`;
      } else {
        this.tourView.style.top = `${targetPos.top+targetPos.height+10}px`;
      }

      if (targetPos.left + tourViewPos.width + 10 > window.innerWidth ) {
        this.tourView.style.left = `${targetPos.left-tourViewPos.width-10}px`;
        this.tourView.style.top = `${targetPos.top}px`;
      } else {
        this.tourView.style.left = `${targetPos.left}px`;
      }

      // add shadow for the target element for illustration
      this.target.classList.add('tiny-tour-target');
    };

    // function for next button
    this.getNextStep =()=>{
      // trigger clean for next target element
      this.clean();
      // determine if the tour ends
      if (this.index+2 > this.stepList.length) {
        resizeObserver.unobserve(this.tourView);
        this.tourView.style.display = 'none'; return;
      };
      // point to the next step and re-render
      this.index++;
      this.currentStep = stepList.at(this.index);
      this.render();
    };

    // function for prev button
    this.getPrevStep =()=>{
      // trigger clean for next target element
      this.clean();
      // determine if the tour ends
      if (this.index-1 <0) {
        resizeObserver.unobserve(this.tourView);
        this.tourView.style.display = 'none';
        return;
      };
      // point to the next step and re-render
      this.index--;
      this.currentStep = stepList.at(this.index);
      this.render();
    };
    // clean function for removing the shadow from current target
    // and update the current button text.
    this.clean = ()=>{
      this.nextBtn.textContent = this.index+2 >
                                 this.stepList.length? 'Done':'Next';
      this.prevBtn.textContent = this.index-1 <0 ?'End':'Back';
      this.target.classList.remove('tiny-tour-target');
    };

    // initilization tour view
    this.tourView = this.createElement('div', 'id', 'tiny-tour-box');
    this.closeBtn = this.createElement('button', 'id', 'tiny-tour-close');
    this.header = this.createElement('div', 'id', 'tiny-tour-header');
    this.content = this.createElement('div', 'id', 'tiny-tour-content');
    this.btnContainer = this.createElement('div', 'class', 'tiny-tour-buttons');
    this.prevBtn = this.createElement('button', 'class', 'tiny-tour-prev');
    this.nextBtn = this.createElement('button', 'class', 'tiny-tour-next');
    this.tourView.style.transition = 'top 0.2s, left 0.2s';

    // function for close button
    this.closeBtn.addEventListener('click', ()=>{
      resizeObserver.unobserve(this.tourView);
      this.target.classList.remove('tiny-tour-target');
      this.tourView.style.display = 'none';
    });

    this.appendChild(this.tourView, this.closeBtn, this.header, this.content,
        (this.appendChild(this.btnContainer, this.prevBtn, this.nextBtn)));

    document.body.appendChild(this.tourView);

    // binding
    this.prevBtn.addEventListener('click', this.getPrevStep);
    this.nextBtn.addEventListener('click', this.getNextStep);

    // Re-render for tour resize event
    const resizeObserver = new ResizeObserver((entries) => {
      this.render();
    });
    resizeObserver.observe(this.tourView);

    // Scroll into target element after transition
    this.tourView.ontransitionend = ()=>{
      this.tourView.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    };
    this.render();
    this.tourView.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }
}
