import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const visibleHeight = 420;

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        new Array(20).fill(0).map((e, i) => i),
        new Array(400).fill(0).map((e, i) => i),
        new Array(8000).fill(0).map((e, i) => i)
      ],
      scrollTop: 0,
      displayStart: 0,
      displayEnd: 7
    };
  }

  handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    console.log(scrollTop);
    const displayStart = Math.floor(scrollTop / 60);
    const displayEnd = displayStart + 7;
    const newState = Object.assign({}, this.state, {
      scrollTop,
      displayStart,
      displayEnd
    });
    console.log(newState);
    this.setState(newState);
  }

  render() {
    const visible_start = this.state.scrollTop;
    const visible_end = this.state.scrollTop + 420;

    return (
      <div className="App">
        This should be the content
        <div className="content" onScroll={this.handleScroll.bind(this)}>
          <div className="content-container">
            {
              this.state.data.map((elem, ie) => {
                const factor = Math.pow(20, 2 - ie);
                const start = Math.max(0, Math.floor(this.state.displayStart / factor) - 2);
                const end = Math.min(8000 / factor, Math.ceil(this.state.displayEnd / factor) + 2);
                const height = factor * 60;
                const current_length = factor;
                return (
                  <div key={ie} className="content-column">
                    {
                      elem.slice(start, end).map((grid, ig) => {

                        /**
                         * 当前列表项是否将内容居中
                         * 1. 不可见时居中
                         * 2. 上下都可见时居中
                         * 3. 只有一部分可见时不居中
                         * @type {boolean}
                         */
                        let centered = true;
                        /**
                         * 为了将当前列表项中的内容放在列表项的可见区段中间，内容应该距离当前列表项的上沿多少（即 CSS top 属性）。
                         * @type {number}
                         */
                        let top_offset = -1;
                        console.log({
                          a: ig + start,
                          b: this.state.displayStart,
                          c: this.state.displayEnd
                        })
                        if (false) {

                        } else {

                          /**
                           * 当前层级当前列表项的下标
                           * @type {number}
                           */
                          const this_index = ig + start;
                          /**
                           * 当前列表项开始的高度
                           * @type {number}
                           */
                          const this_start_height = current_length * this_index * 60;
                          /**
                           * 当前列表项结束的高度
                           * @type {number}
                           */
                          const this_end_height = current_length * (this_index + 1) * 60;
                          if (this_end_height <= visible_start || this_start_height >= visible_end) {
                            centered = true;
                          } else {
                            // 列表项上下都在范围中，完全可见的情形
                            if (this_start_height >= visible_start && this_end_height <= visible_end) {
                              centered = true;
                            } else if (this_start_height < visible_start && this_end_height > visible_end) { // 上下都不可见
                              centered = false;
                              // 计算应该离上沿的高度
                              top_offset = visible_start - this_start_height + visibleHeight / 2;
                            } else if (this_start_height < visible_start) { // 列表项上面起某部分不可见
                              centered = false;
                              // 计算应该离上沿的高度
                              top_offset = visible_start - this_start_height + (this_end_height - visible_start) / 2;
                            } else if (this_end_height > visible_end) { // 列表项下面起某部分不可见
                              centered = false;
                              // 计算应该离上沿的高度
                              top_offset = visible_end - this_start_height - (visible_end - this_start_height) / 2;
                            }
                          }
                        }

                        // console.log({
                        //   this_start_height,
                        //   this_end_height,
                        //   this_index,
                        //   visible_start,
                        //   visible_end,
                        //   centered
                        // })

                        const className = "grid-content" + (centered ? "" : " is-centered");
                        console.log({
                          className
                        });

                        const style = centered ? {} : {
                          transform: `translateX(-50%)translateY(-50%)translateY(${top_offset}px)`
                        };

                        return (
                          <div key={ig} className="grid" style={{
                            'height': height + 'px',
                            'transform': 'translateY(' + ((start + ig) * factor * 60) + 'px)'
                          }}>
                            <div className={className} style={style}>{grid}</div>
                            {/* <input /> */}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
